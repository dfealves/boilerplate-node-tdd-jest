const express = require("express");
const app = express.Router();

app.get("/", (req, res, next) => {
  res.status(200).send({
    title: "Node ZoozTech API",
    version: "0.0.1",
  });
});

module.exports = app;
