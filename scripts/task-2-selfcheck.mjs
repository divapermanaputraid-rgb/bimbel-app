// Self-check for /api/guru/mengajar route logic.
// Loads the real GET handler; mocks @/lib/supabase/server with an in-memory DB.
import { strict as assert } from "node:assert";
import Module from "node:module";
import path from "node:path";

const API_DIR = path.dirname(new URL(import.meta.url).pathname)
  .replace("/scripts", "/src/app/api/guru/mengajar");

// ---- in-memory DB ----
const materials = [
  { id: "k3mtk-1", kelas: 3, subject_id: "mtk", judul: "Bilangan", deskripsi: "d", urutan: 1, file_path: "k3/mtk/1.html", is_active: true },
  { id: "k3mtk-2", kelas: 3, subject_id: "mtk", judul: "Pecahan", deskripsi: "d", urutan: 2, file_path: "k3/mtk/2.html", is_active: true },
  { id: "k3bing-1", kelas: 3, subject_id: "bing", judul: "Greetings", deskripsi: "d", urutan: 1, file_path: "k3/bing/1.html", is_active: true },
  { id: "k4mtk-1", kelas: 4, subject_id: "mtk", judul: "Angka", deskripsi: "d", urutan: 1, file_path: "k4/mtk/1.html", is_active: true },
  // inactive — must be excluded from every shape
  { id: "k3ipa-1", kelas: 3, subject_id: "ipa", judul: "Nonaktif", deskripsi: "d", urutan: 1, file_path: "k3/ipa/1.html", is_active: false },
];
const questions = [
  { material_id: "k3mtk-1" }, { material_id: "k3mtk-1" }, { material_id: "k3mtk-1" },
  { material_id: "k3bing-1" },
  { material_id: "k4mtk-1" }, { material_id: "k4mtk-1" },
];

// ---- minimal query-builder mock ----
// Each method chain returns a thenable: `await supabase.from(...).select(...).eq(...)...`
// invokes `then` with the result computed lazily from the accumulated filters.
function makeResult(table, filters) {
  if (table === "users") return { data: { role: "guru" }, error: null };
  if (table === "materials") {
    let rows = materials.filter((m) => m.is_active !== false);
    for (const [op, col, v] of filters) {
      if (op === "eq") rows = rows.filter((row) => row[col] === v);
      if (op === "in") rows = rows.filter((row) => v.includes(row[col]));
    }
    rows = [...rows].sort((a, b) => (a.urutan ?? 0) - (b.urutan ?? 0));
    return { data: rows.map(({ is_active, ...rest }) => ({ ...rest })), error: null };
  }
  if (table === "questions") {
    const ids = filters.find(([op]) => op === "in")?.[2] ?? [];
    return { data: questions.filter((x) => ids.includes(x.material_id)), error: null };
  }
  return { data: [], error: null };
}

const mockServer = {
  createClient: async () => ({
    auth: { getUser: async () => ({ data: authMode === "no-user" ? { user: null } : { user: { id: "u1" } }, error: null }) },
    from(table) {
      const chain = {
        _filters: [],
        _single: false,
        select: () => chain,
        eq: (c, v) => { chain._filters.push(["eq", c, v]); return chain; },
        in: (c, v) => { chain._filters.push(["in", c, v]); return chain; },
        order: () => chain,
        single: () => { chain._single = true; return chain; },
        then(onFulfilled, onRejected) {
          const result = table === "users"
            ? { data: { role: authMode === "siswa" ? "siswa" : "guru" }, error: null }
            : makeResult(table, chain._filters);
          const payload = chain._single && Array.isArray(result.data)
            ? { data: result.data[0] ?? null, error: result.data.length === 1 ? null : { message: "not found" } }
            : result;
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

async function call(url) {
  const req = { url };
  const res = await GET(req);
  return { status: res.status, body: await res.json() };
}

const cases = [
  {
    name: "no query → subjects aggregate won't double count inactive; kelas-level shape",
    url: "http://x/api/guru/mengajar",
    expect: (b) => {
      assert.ok(Array.isArray(b.kelas), "kelas is array");
      assert.equal(b.kelas.length, 6, "6 kelas entries");
      assert.ok(b.kelas.every((k) => k.kelas >= 1 && k.kelas <= 6));
      assert.ok(b.kelas.every((k) => Array.isArray(k.subjects)));
      // kelas 3: mtk (2), bing (1); ipa inactive excluded
      const k3 = b.kelas.find((k) => k.kelas === 3);
      assert.deepEqual(k3.subjects, [
        { subject_id: "mtk", materi_count: 2 },
        { subject_id: "bing", materi_count: 1 },
      ]);
      console.log("      OK kelas3:", JSON.stringify(k3.subjects));
    },
  },
  {
    name: "?kelas=3 → { subjects }",
    url: "http://x/api/guru/mengajar?kelas=3",
    expect: (b) => {
      assert.ok(Array.isArray(b.subjects));
      assert.deepEqual(b.subjects, [
        { subject_id: "mtk", materi_count: 2 },
        { subject_id: "bing", materi_count: 1 },
      ]);
      console.log("      OK subjects:", JSON.stringify(b.subjects));
    },
  },
  {
    name: "?kelas=3&subject=mtk → materials with soal_count",
    url: "http://x/api/guru/mengajar?kelas=3&subject=mtk",
    expect: (b) => {
      assert.ok(Array.isArray(b.materials));
      assert.equal(b.materials.length, 2);
      const m1 = b.materials.find((m) => m.id === "k3mtk-1");
      assert.equal(m1.judul, "Bilangan");
      assert.equal(m1.soal_count, 3, "soal_count counts questions");
      const m2 = b.materials.find((m) => m.id === "k3mtk-2");
      assert.equal(m2.soal_count, 0, "material with no questions → 0");
      assert.ok("file_path" in m1 && "urutan" in m1 && "deskripsi" in m1);
      console.log("      OK materials:", JSON.stringify(b.materials.map((m) => ({ id: m.id, soal_count: m.soal_count }))));
    },
  },
  {
    name: "?kelas=99 → 400",
    url: "http://x/api/guru/mengajar?kelas=99",
    expect: (b, s) => {
      assert.equal(s, 400);
      assert.equal(b.error, "kelas must be 1-6");
      console.log("      OK 400:", JSON.stringify(b.error));
    },
  },
  {
    name: "?kelas=abc → 400",
    url: "http://x/api/guru/mengajar?kelas=abc",
    expect: (b, s) => {
      assert.equal(s, 400);
      console.log("      OK 400 for non-numeric kelas");
    },
  },
];

// ---- auth-gate checks (authMode read per-request via closure) ----
const authCases = [
  { mode: "no-user", expect: 401 },
  { mode: "siswa", expect: 403 },
];
let authPass = 0;
for (const ac of authCases) {
  authMode = ac.mode;
  const res = await GET({ url: "http://x/api/guru/mengajar" });
  const body = await res.json();
  const ok = res.status === ac.expect && body.error;
  if (ok) { authPass += 1; console.log(`PASS auth gate ${ac.mode} → ${ac.expect}`); }
  else { console.error(`FAIL auth gate ${ac.mode}: got ${res.status} ${JSON.stringify(body)}`); process.exitCode = 1; }
}
authMode = "guru";

let pass = 0;
for (const c of cases) {
  try {
    const { status, body } = await call(c.url);
    c.expect(body, status);
    pass += 1;
    console.log(`PASS ${c.name}`);
  } catch (e) {
    console.error(`FAIL ${c.name}: ${e.message}`);
    process.exitCode = 1;
  }
}
console.log(`\n${pass}/${cases.length} shape checks + ${authPass}/${authCases.length} auth checks passed`);