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
