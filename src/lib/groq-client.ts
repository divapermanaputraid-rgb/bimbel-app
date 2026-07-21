// src/lib/groq-client.ts
const GROQ_KEYS = [
  process.env.GROQ_KEY_1,
  process.env.GROQ_KEY_2,
  process.env.GROQ_KEY_3,
].filter(Boolean) as string[];

const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

let currentKeyIndex = 0;

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function groqChat(
  messages: ChatMessage[],
  retries = 0
): Promise<{ reply: string; model: string; tokensUsed: number }> {
  if (GROQ_KEYS.length === 0) {
    throw new Error("No Groq API keys configured.");
  }

  const key = GROQ_KEYS[currentKeyIndex];

  try {
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      if (res.status === 429 || res.status === 401 || res.status >= 500) {
        throw new Error(`Groq Error ${res.status}: ${errorText}`);
      }
      // Unrecoverable error
      throw new Error(`Groq Fatal ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    return {
      reply: data.choices[0].message.content,
      model: data.model,
      tokensUsed: data.usage?.total_tokens || 0,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`[Groq Client] Error on key index ${currentKeyIndex}:`, message);

    // Round-robin fallback
    currentKeyIndex = (currentKeyIndex + 1) % GROQ_KEYS.length;

    if (retries < GROQ_KEYS.length - 1) {
      console.log(`[Groq Client] Retrying with next key (index: ${currentKeyIndex})...`);
      return groqChat(messages, retries + 1);
    }

    throw new Error("All Groq keys exhausted or failed.");
  }
}
