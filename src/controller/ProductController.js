const mongoose = require("mongoose");
const Product = require("../models/products");

exports.index = (req, res, next) => {
  Product.find({ active: true }, "title price slug")
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};

exports.create = (req, res, next) => {
  const product = new Product(req.body);
  product
    .save()
    .then(x => {
      res.status(201).send({ message: "Produto cadastrado com sucesso!" });
    })
    .catch(e => {
      res
        .status(400)
        .send({ message: "Falha ao cadastrar o produto", data: e });
    });
};

exports.update = (req, res, next) => {
  const { id } = req.params;
  res.status(200).send({
    id: id,
    item: req.body
  });
};

exports.delete = (req, res, next) => {
  res.status(200).send(req.body);
};
