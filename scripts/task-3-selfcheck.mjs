// Self-check for /api/guru/mengajar/[materialId] route logic.
// Loads the real GET handler; mocks @/lib/supabase/server with an in-memory DB.
import { strict as assert } from "node:assert";
import Module from "node:module";
import path from "node:path";

const API_DIR = path.dirname(new URL(import.meta.url).pathname)
  .replace("/scripts", "/src/app/api/guru/mengajar/[materialId]");

// ---- in-memory DB ----
// k3mtk-1: >20 questions total (head count TOTAL=25) → soal_lengkap true
// k3mtk-3: 2 questions → soal_lengkap false
const materials = [
  { id: "k3mtk-1", kelas: 3, subject_id: "mtk", judul: "Bilangan", deskripsi: "d", file_path: "k3/mtk/1.html", is_active: true },
  { id: "k3mtk-3", kelas: 3, subject_id: "mtk", judul: "Operasi", deskripsi: null, file_path: "k3/mtk/3.html", is_active: true },
  { id: "k3mtk-2", kelas: 3, subject_id: "mtk", judul: "Pecahan", deskripsi: "d", file_path: "k3/mtk/2.html", is_active: false },
  { id: "k3mtk-capped", kelas: 3, subject_id: "mtk", judul: "Capped", deskripsi: null, file_path: "k3/mtk/9.html", is_active: true },
];
const TOTAL = 25; // head-count for k3mtk-1 (how many it claims in DB)
const questions = [
  ...Array.from({ length: 3 }, (_, i) => ({
    id: `q1-${i + 1}`, material_id: "k3mtk-1", soal: `Soal ke-${i + 1}`,
    tipe: "pilihan_ganda", pilihan: ["a", "b"], jawaban_benar: "a",
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    id: `q3-${i + 1}`, material_id: "k3mtk-3", soal: `Ops ${i + 1}`,
    tipe: null, pilihan: [], jawaban_benar: "b",
  })),
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `qc-${i + 1}`, material_id: "k3mtk-capped", soal: `Cap ${i + 1}`,
    tipe: null, pilihan: [], jawaban_benar: "c",
  })),
];

// ---- minimal query-builder mock ----
function makeResult(table, filters, opts) {
  if (table === "users") return { data: [{ id: "u1", role: authMode === "siswa" ? "siswa" : "guru" }], error: null };
  if (table === "materials") {
    let rows = materials.filter((m) => m.is_active !== false);
    for (const [op, col, v] of filters) {
      if (op === "eq") rows = rows.filter((row) => row[col] === v);
    }
    return { data: rows, error: null };
  }
  if (table === "questions") {
    const id = filters.find(([op, col]) => op === "eq" && col === "material_id")?.[2];
    if (opts?.head) {
      const count = id === "k3mtk-1" ? TOTAL : questions.filter((q) => q.material_id === id).length;
      return { count, error: null, data: [] };
    }
    let rows = questions.filter((q) => q.material_id === id);
    if (opts?.limit) rows = rows.slice(0, opts.limit);
    return { data: rows, error: null };
  }
  return { data: [], error: null };
}

const mockServer = {
  createClient: async () => ({
    auth: { getUser: async () => ({ data: authMode === "no-user" ? { user: null } : { user: { id: "u1" } }, error: null }) },
    from(table) {
      let chain = {
        _filters: [],
        _single: false,
        _maybeSingle: false,
        _head: false,
        _limit: null,
        select: (...args) => {
          if (args[1] && typeof args[1] === "object") chain._head = !!args[1].head;
          return chain;
        },
        eq: (c, v) => { chain._filters.push(["eq", c, v]); return chain; },
        order: () => chain,
        limit: (n) => { chain._limit = n; return chain; },
        single: () => { chain._single = true; return chain; },
        maybeSingle: () => { chain._single = true; chain._maybeSingle = true; return chain; },
        then(onFulfilled, onRejected) {
          const result = makeResult(table, chain._filters, { head: chain._head, limit: chain._limit });
          let payload = result;
          if (chain._head) {
            payload = { count: result.count, error: result.error };
          } else if (chain._single) {
            const arr = result.data ?? [];
            // `.single()` errors when !=1 row; `.maybeSingle()` returns 0-or-1 (error null)
            payload = chain._maybeSingle
              ? { data: arr.length ? arr[0] : null, error: null }
              : { data: arr[0] ?? null, error: arr.length === 1 ? null : { message: "not found" } };
          }
          return new Promise((resolve) => resolve(payload)).then(onFulfilled, onRejected);
        },
      };
      return chain;
    },
  }),
};

let authMode = "guru"; // no-user | siswa | guru

// ---- intercept @/lib/supabase/server import ----
const origLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === "@/lib/supabase/server" || request.endsWith("/src/lib/supabase/server")) {
    return mockServer;
  }
  return origLoad.apply(this, arguments);
};

const routePath = path.join(API_DIR, "route.ts");
const { GET } = await import(routePath);

async function call(materialId) {
  const req = { url: `http://x/api/guru/mengajar/${materialId}` };
  const res = await GET(req, { params: { materialId } });
  return { status: res.status, body: await res.json() };
}

let pass = 0;
const cases = [];
function t(name, fn) { cases.push([name, fn]); }

t("found → material + soal, pertanyaan normalized from soal", async () => {
  const { status, body } = await call("k3mtk-1");
  assert.equal(status, 200);
  assert.equal(body.material.judul, "Bilangan");
  assert.equal(body.material.kelas, 3);
  assert.equal(body.material.subject_id, "mtk");
  assert.equal(body.material.file_path, "k3/mtk/1.html");
  assert.equal(body.material.is_active, undefined, "is_active not leaked");
  assert.ok(body.soal.every((q) => !("soal" in q) && "pertanyaan" in q), "soal column renamed to pertanyaan");
  assert.equal(body.soal[0].pertanyaan, "Soal ke-1");
  assert.deepEqual(Object.keys(body.soal[0]).sort(), ["id", "jawaban_benar", "pertanyaan", "pilihan", "tipe"].sort());
  assert.equal(body.soal_count, TOTAL, "count comes from head query");
  assert.equal(body.soal_lengkap, true, "soal_count >= 20 → true");
  console.log("      OK soal_count:", body.soal_count, "soal_lengkap:", body.soal_lengkap, "returned:", body.soal.length);
});

t("soal_lengkap=false when count < 20", async () => {
  const { status, body } = await call("k3mtk-3");
  assert.equal(status, 200);
  assert.equal(body.soal_count, 2);
  assert.equal(body.soal_lengkap, false);
  assert.equal(body.soal.length, 2);
  assert.equal(body.material.deskripsi, null, "null deskripsi passes through");
});

t("payload capped at 20 when count > 20", async () => {
  const { status, body } = await call("k3mtk-capped");
  assert.equal(status, 200);
  assert.equal(body.soal.length, 20, "returns at most 20 soal");
  assert.equal(body.soal_count, 30, "count reflects full bank");
  assert.equal(body.soal_lengkap, true);
});

t("404 for inactive material", async () => {
  const { status, body } = await call("k3mtk-2");
  assert.equal(status, 404);
  assert.equal(body.error, "Material not found");
});

t("404 for bogus id", async () => {
  const { status, body } = await call("does-not-exist");
  assert.equal(status, 404);
  assert.equal(body.error, "Material not found");
});

for (const [name, fn] of cases) {
  try {
    await fn();
    pass += 1;
    console.log(`PASS ${name}`);
  } catch (e) {
    console.error(`FAIL ${name}: ${e.message}`);
    process.exitCode = 1;
  }
}

// ---- auth-gate checks ----
const authCases = [
  { mode: "no-user", expect: 401 },
  { mode: "siswa", expect: 403 },
];
let authPass = 0;
for (const ac of authCases) {
  authMode = ac.mode;
  const { status, body } = await call("k3mtk-1");
  const ok = status === ac.expect && body.error;
  if (ok) { authPass += 1; console.log(`PASS auth gate ${ac.mode} → ${ac.expect}`); }
  else { console.error(`FAIL auth gate ${ac.mode}: got ${status} ${JSON.stringify(body)}`); process.exitCode = 1; }
}
authMode = "guru";

console.log(`\n${pass}/${cases.length} shape checks + ${authPass}/${authCases.length} auth checks passed`);