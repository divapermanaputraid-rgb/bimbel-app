import assert from "node:assert/strict";
import { backAction, pathFromAppUrl } from "./native-shell.ts";

assert.equal(backAction(true), "history-back");
assert.equal(backAction(false), "confirm-exit");

assert.equal(
  pathFromAppUrl("https://bimbel-sd.vercel.app/dashboard/siswa"),
  "/dashboard/siswa"
);
assert.equal(
  pathFromAppUrl("https://bimbel-sd.vercel.app/dashboard/siswa?x=1"),
  "/dashboard/siswa"
);
assert.equal(pathFromAppUrl("not a url"), null);
assert.equal(pathFromAppUrl(""), null);

console.log("native-shell.test.mjs: ok");
