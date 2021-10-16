const { context } = require("../index.js");

const ctx = context();
ctx.set("Hello", "world");

console.log(ctx.get("Hello"));
console.log(context().get("Hello"));
