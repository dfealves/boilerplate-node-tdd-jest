const mongoose = require("mongoose");
const Product = require("../models/products");

exports.index = (req, res, next) => {
  Product.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.create = (req, res, next) => {
  const product = new Product(req.body);
  product
    .save()
    .then((x) => {
      res.status(201).json(product);
    })
    .catch((e) => {
      res.status(400).send("Falha ao cadastrar o produto");
    });
};

exports.update = async (req, res, next) => {
  const productId = req.params.id;
  const product = req.body;

  const response = await Product.findOne({ _id: productId });
  if (!response) return res.status(400).json("produto não encontrado");

  product.__v;
  product._id;
  try {
    await Product.updateOne({ _id: response._id }, { $set: product });

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json("Aconteceu um erro inesperado, tente novamente");
  }
};

exports.profile = (req, res, next) => {
  const { id } = req.params;
  Product.findOne({ _id: id })
    .then((data) => {
      res.status(200).send(data);
      console.log(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};
exports.delete = async (req, res, next) => {
  const productId = req.params.id;

  const response = await Product.findOne({ _id: productId });
  if (!response) return res.status(400).json("produto não encontrado");

  console.log(response);

  try {
    await Product.findByIdAndDelete({ _id: response._id });

    return res.status(204);
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json("Aconteceu um erro inesperado, tente novamente");
  }
};
