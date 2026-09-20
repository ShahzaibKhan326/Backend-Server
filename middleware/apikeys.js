const apiKey = (req, res, next) => {
  const key = req.query.apiKey;

  if (key !== "12345") {
    return res.status(401).json({
      status: false,
      message: "Invalid API Key"
    });
  }

  next();
};

module.exports = apiKey;