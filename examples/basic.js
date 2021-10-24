const { context } = require("../index.js");

const ctx = context();
ctx.set("Hello", "world"); 
ctx.setWithTimeout("Hello2", Promise.resolve('world2')); // avoid memory leaks for promise value

console.log(ctx.get("Hello")); // world
console.log(context().get("Hello")); // world
console.log(ctx.get("Hello2")); // Promise { 'world2' }
console.log(context().get("Hello2")); // Promise { 'world2' }