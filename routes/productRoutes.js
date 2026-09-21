const express = require("express");

const router = express.Router();

const products = require("../data/products");
const apikey = require("../middleware/apikeys");

const {getProducts , getProductById , createProduct , updateProduct , deleteProduct} = require("../controllers/product.controller");

router.use(apikey)

router.get("/", getProducts)

router.get("/:id", getProductById);

router.post("/", createProduct)

router.put("/:id", updateProduct)

router.delete("/:id",  deleteProduct )

module.exports = router;