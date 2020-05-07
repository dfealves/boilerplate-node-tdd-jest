const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const router = express.Router();

//coneção com o mongo
mongoose.connect(
  "mongodb+srv://dfealves:dfealves@api-str-rtt5a.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.set("useCreateIndex", true);

//carregando models
const Product = require("../src/models/products");

//carregando rotas
const routes = require("./routes/route");
const product = require("./routes/products");

app.use(cors());
//middleware converte o body da requisição para diversos formatos, neste exemplo para .json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);
app.use("/products", product);

module.exports = app;
