const products = require("./data/products")
const express = require("express")

const app = express()

app.use(express.json())



app.get("/products/:id" , (req,res) => {
const id = Number(req.params.id) ;

 const product = products.find((product) => product.id === id)

 if(!product)
 return res.status(404).json({
 status:false , message: "Product Not Found"
});

 res.json(product)
  
})

app.get("/products" , (req , res) => {
  const category = req.query.category;
  if(category)
  {
    res.send(`Product Category : ${category}`)
  }
  else {
    // res.send("All Products")
    res.json(products)

  }
})

app.put("/products/:id" ,(req , res) => 
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

app.post("/products" , (req,res)=> {
 const  name = req.body.name ;
 const  price =  req.body.price;

 if(!name || !price) 
 {
  return res.status(400).json({
    status:false,
    message : "Name and Price are required"
  })
 }

 if(typeof price !== "number")
 {
  return res.status(400).json({status:false , message: "Price is not a number"})
 }
 
 const newProduct = {
  id : Date.now() ,
  name ,
  price ,
 }

 products.push(newProduct)

 res.status(201).json(newProduct)

})


app.delete("/products/:id" , (req ,res) => {

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



app.listen(3000 , () => {
  console.log("Server running on port 3000")
})

