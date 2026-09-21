const validateProduct = (req, res, next) => {
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

  next();
};

module.exports = validateProduct;