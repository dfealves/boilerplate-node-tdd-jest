const express = require("express");
const router = express.Router();
const ProductController = require("../controller/ProductController");

router.get("/", ProductController.index);

router.post("/", ProductController.create);

router.put("/:id", ProductController.update);

router.delete("/", ProductController.delete);

// router.get("/", (req, res) => {
//   const products = [
//     {
//       title: "Title product",
//       description: "description product",
//     },
//   ];
//   res.status(200).json(products);
// });

module.exports = router;
