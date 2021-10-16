# jscontext

Comprehensive way to making context for your application e.g for express request handling and share between application layers.

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

console.log(ctx.get("Hello"));
console.log(context().get("Hello"));
```

Example using expressjs :

```js
// context.js
import { contextMiddleware, context } from "node-jscontext";

export default {
  contextMiddleware,
  context: context(),
};

// index.js
import express from "express";
import applicationContext from "./context.js";

const { contextMiddleware, context } = applicationContext;

const app = express();

// ofcourse you can create your own modified context so we can pass it as argument
// instead of using default node-jscontext context
app.use(contextMiddleware(context));

// share between routes
app.get("/", (req, res) => {
  req.context.set("date", Date());

  return res.send("Binded");
});

app.get("/binded", (req, res) => {
  // e.g share between layer from the context we made in context.js
  console.log(context.get("date"));
  console.log(context.namespace);

  return res.status(200).send(req.context.get("date"));
});

const PORT = 8000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
```
