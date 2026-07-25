export type BackAction = "history-back" | "confirm-exit";

export function backAction(canGoBack: boolean): BackAction {
  return canGoBack ? "history-back" : "confirm-exit";
}

/** Returns pathname only, or null if URL is unusable. */
export function pathFromAppUrl(url: string): string | null {
  if (!url || typeof url !== "string") return null;
  try {
    const parsed = new URL(url);
    return parsed.pathname || null;
  } catch {
    return null;
  }
}
