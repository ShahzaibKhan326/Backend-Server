
const express = require("express")

const app = express()

app.use(express.json())

// ----Product APIs------>


app.get("/products/:id" , (req,res) => {
  const id = req.params.id ;
  res.send(`Product ID : ${id} `)
})

app.get("/products" , (req , res) => {
  const category = req.query.category;
  if(category)
  {
    res.send(`Product Category : ${category}`)
  }
  else {
    res.send("All Products")
  }
})

app.post("/products" , (req,res)=> {
 const  name = req.body.name ;
 const  price =  req.body.price;
 res.send(`Product: ${name} , Price : ${price}`)
})


// ------User APIs------->

app.get("/users" ,(req,res) => {
  res.send("All Users")
})


app.get("/users/:id" , (req , res) => {
  const id = req.params.id;
  res.send(`User ID : ${id}`)
})

app.listen(3000 , () => {
  console.log("Server running on port 3000")
})

