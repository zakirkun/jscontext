# jscontext

[![Known Vulnerabilities](https://snyk.io/test/github/fncolon/jscontext/badge.svg?targetFile=package.json)](https://snyk.io/test/github/fncolon/jscontext?targetFile=package.json)
[![npm stable version](https://img.shields.io/npm/v/node-jscontext.svg?logo=npm)](https://npmjs.com/package/node-jscontext)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Comprehensive way to making context for your application e.g for express request handling and share between application layers.

## Table Of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [License](#license)

## Installation

```bash
npm i node-jscontext
```

## Usage

Basic example :

```js
const { context } = require("../index.js");

const ctx = context();
ctx.set("Hello", "world"); 
ctx.setWithTimeout("Hello2", Promise.resolve('world2')); // avoid memory leaks for promise value

// multipleset by object
examples = {
    name: "js context",
    version : 1.2
}

ctx.multiSet(examples) // set with object data

console.log(ctx.get("Hello")); // world
console.log(context().get("Hello")); // world
console.log(ctx.get("Hello2")); // Promise { 'world2' }
console.log(context().get("Hello2")); // Promise { 'world2' }

ctx.getWithCallback("Hello", (result => console.log(result))) // callback as a functon
console.log(ctx.get("name")) // get by name
context().getWithCallback("version", (res => console.log(res))) // get return callback
```

[Example using expressjs](./examples/express/README.md)

## API

`node-jscontext` provide a context with list of APIs below.

- `context()`
  - `get()`
    clsBind binded function to get value from continuation local storage by key.
  - `set()`
    clsBind binded function to set value from continuation local storage by key.
  - `setWithTimeout()`
    clsBind binded function to set value from continuation local storage by key with timeout.
  - `namespace`
    gets the continuation namespace data.
  - `multipleSet`
    clsBind binded function to multi set value from continuation local storage by object key
  - `getWithCallback`
    clsBind binded function to get value from continuation local storage by key an return as callback  
- `contextMiddleware(context: ContextReturn)`
  returns express middleware.

## License

`node-jscontext` using [MIT License](./LICENSE.md)
