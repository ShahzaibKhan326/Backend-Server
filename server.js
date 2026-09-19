const products = require("./data/products")
const users = require("./data/users")
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
    // res.send("All Products")
    res.json(products)

  }
})

app.post("/products" , (req,res)=> {
 const  name = req.body.name ;
 const  price =  req.body.price;
 res.send(`Product: ${name} , Price : ${price}`)
})

// app.get("/products" , (req,res) => {
//   res.json(products)
// })


// ------User APIs------->

app.get("/users" ,(req,res) => {
  res.json(users)
})


app.get("/users/:id" , (req , res) => {
  const id = req.params.id;
  res.send(`User ID : ${id}`)
})



app.listen(3000 , () => {
  console.log("Server running on port 3000")
})

