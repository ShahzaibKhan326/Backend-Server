const express = require("express")

const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")


const app = express()

app.use(express.json())

app.use("/products" , productRoutes)
app.use("/users" , userRoutes)


app.listen(3000 , () => {
  console.log("Server running on port 3000")
})






