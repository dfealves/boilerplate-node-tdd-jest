const express = require("express");
const router = express.Router();
const ProductController = require("../controller/ProductController");

router.get("/", ProductController.index);

router.post("/", ProductController.create);

router.put("/:id", ProductController.update);

router.delete("/", ProductController.delete);

module.exports = router;
