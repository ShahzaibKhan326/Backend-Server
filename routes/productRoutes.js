const express = require("express");

const router = express.Router();

const products = require("../data/products");
const apikey = require("../middleware/apikeys");


router.get("/", apikey, (req, res) => {
  const category = req.query.category;

  if (category) {
    return res.json({
      status: true,
      message: "Products fetched successfully",
      data: products.filter((product) => product.category === category)
    });
  }

  res.status(200).json({
    status: true,
    message: "Products fetched successfully",
    data: products
  });
});


router.get("/:id", apikey, (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({
      status: false,
      message: "Product Not Found"
    });
  }

  res.status(200).json({
    status: true,
    message: "Product fetched successfully",
    data: product
  });
});

router.post("/", apikey, (req, res) => {
  const name = req.body.name;
  const price = req.body.price;

  if (!name || price === undefined) {
    return res.status(400).json({
      status: false,
      message: "Name and Price are required"
    });
  }

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      status: false,
      message: "Name must be a valid string"
    });
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({
      status: false,
      message: "Price must be a number greater than 0"
    });
  }

  const newProduct = {
    id: Date.now(),
    name: name.trim(),
    price
  };

  products.push(newProduct);

  res.status(201).json({
    status: true,
    message: "Product created successfully",
    data: newProduct
  });
});


router.put("/:id", apikey, (req, res) => {
  const id = Number(req.params.id);

  const name = req.body.name;
  const price = req.body.price;

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({
      status: false,
      message: "Product Not Found"
    });
  }

  if (!name || price === undefined) {
    return res.status(400).json({
      status: false,
      message: "Name and Price are required"
    });
  }

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      status: false,
      message: "Name must be a valid string"
    });
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({
      status: false,
      message: "Price must be a number greater than 0"
    });
  }

  product.name = name.trim();
  product.price = price;

  res.status(200).json({
    status: true,
    message: "Product updated successfully",
    data: product
  });
});


router.delete("/:id", apikey, (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({
      status: false,
      message: "Invalid product id"
    });
  }

  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: false,
      message: "Product Not Found"
    });
  }

  products.splice(index, 1);

  res.status(200).json({
    status: true,
    message: "Product Deleted"
  });
});

module.exports = router;