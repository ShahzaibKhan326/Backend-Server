const apikey = (req,res,next) => {
  const key = req.query.apikey;

  if(key !== "12345")
  {
     return res.status(401).json({
      status: false,
      message: "Invalid API Key"
    });
  }

  next();

}

module.exports =  apikey;