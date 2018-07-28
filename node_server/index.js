const express = require("express");
const app = express();

const APPLICATION_PORT = process.env.port || 8080;

app.get("/", (req, res) => res.send("Hello from Google App Engine!"));

app.get("/teapot", (req, res) => {
  res.status(418).send("Hello I'm a teapot running on Node Standard GAE");
});

app.listen(APPLICATION_PORT, () =>
  console.log(`Example app listening on port ${APPLICATION_PORT}!`)
);
