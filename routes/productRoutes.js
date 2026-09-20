
const express = require("express")

const router = express.Router()

const products = require("../data/products")
const apikey = require("../middleware/apikeys")

// ---------->

router.get("/", apikey , (req, res) => {
  const category = req.query.category;

  if (category) {
    res.send(`Product Category : ${category}`);
  } else {
    res.json(products);
  }
});

// ------------>

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({
      status: false,
      message: "Product Not Found"
    });
  }

  res.json(product);
});


// ----------->

router.post("/", (req, res) => {
  const name = req.body.name;
  const price = req.body.price;

  if (!name || !price) {
    return res.status(400).json({
      status: false,
      message: "Name and Price are required"
    });
  }

  if (typeof price !== "number") {
    return res.status(400).json({
      status: false,
      message: "Price is not a number"
    });
  }

  const newProduct = {
    id: Date.now(),
    name,
    price,
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});


// ----------->

router.put("/:id" ,(req , res) => 
{
  const id = Number(req.params.id)

  const name = req.body.name ;
  const price = req.body.price ;
  
  const product = products.find((product) => 
  product.id === id
  )

  if(!product) 
  {
    return res.status(404).json({status:false , message : "Product Not Found"})
  }


  product.name = name ;
  product.price = price;

  res.json(product)

})


// ------------>

router.delete("/:id" , (req ,res) => {

  const id = Number(req.params.id)

  if(!id)
  {
    return res.status(400).json({status:false , message : "unvalid product id"})
  }

  const index = products.findIndex((product) => product.id === id)
 
  if(index === -1 )
  {
    return res.status(404).json({status:false , message : "unvalid id"})
  }

  else 
  {
     products.splice(index , 1)
     res.status(200).json({status:true , message : "Product Deleted"}) 
  }

})

module.exports = router;