const { context } = require("../index.js");

const ctx = context();
ctx.set("Hello", "world"); 
ctx.setWithTimeout("Hello2", Promise.resolve('world2')); // avoid memory leaks for promise value

// multipleset by object
examples = {
    name: "js context",
    version : 1.2
}

ctx.multipleSet(examples) // set with object data

console.log(ctx.get("Hello")); // world
console.log(context().get("Hello")); // world
console.log(ctx.get("Hello2")); // Promise { 'world2' }
console.log(context().get("Hello2")); // Promise { 'world2' }

ctx.getWithCallback("Hello", (result => console.log(result))) // callback as a functon
console.log(ctx.get("name")) // get by name
context().getWithCallback("version", (res => console.log(res))) // get return callback