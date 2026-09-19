
/* 

Frontend => 
What the user sees and interact with

Buttons
Forms
Cards
Navbar
Pages

------->

Backend =>
The Part that handle things behind the scenes

Data
Users
Authentication
Business logic
APIs
Database
Requests
Responses

------>

API => 
The API is the communication point between the frontend and backend.

------->

One Important detail =>
API isn't necessarily the entire bridge itself.
Think of an api as the defined way/rules through which the frontedn 
communicate with the backend

FOR EXAMPLE :

Frontend => Get /products => API => backend => data

And the backend send a request back =>

Backend => Products data => API => Frontend


-----------Node js-------------->

Node.js =>
Node.js is a runtime that allows javascript to run outside the browser.

THEN =>
Node.js 
Express
Backend APIs

--Simple anology---->

Javacript => Language 
Node.js   => Environment that runs javascript on the server
Express   => Framwork that makes builing the server/API easier 

-----------Express-------------->

JavaScript =>
Language we write.

Node.js => 
Allow JavaScirpt to run on the server.

But there's a problem.

With plan Node.js , creating and managing HTTP server and routes can 
involve more code .

Express.js makes this easier 

Think => 
Node.js 
can run javascript on server 

Expres.js 
Makes building server/API easier

---With Express---->

const express = require("express");

const app = express();

// This create our Express application 

app.get("/product" , (req,res) => 
{
res.send("Products");
}

--We are saying------>
// When someone sends a Get requst to /products , send "Products" back.

AND:
app.listen(3000)

--Means---->
// Start our server and listen for request on port 3000.


//---Complete Process------//

client / Postman 
Get /products 
Node.js 
Express
app.get()
Response
Client

------Three things to remember------------>

javaScript => Programming language 
Node.js    => Runs javascript outside browser
Express.js  => Helps us build server/API

---first Expres Server------->

npm init -y 

Then install Express : 
npm install express

create: 
server.js

put this inside :

const express = require("express");

const app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

---Run--->
node server.js

--------Route------------>

What is Route?

// A route tells Express:
// When a request comes to this URL using HTTP method , do this.

For example :
app.get("/products", (req, res) => {
    res.send("Products");
});

Break it down :

app => get => "/products" => callback function

app => Our Express application 

.get => We're defining what should happen for a Get request. 

"/products"
The URL path

(req,res)
The request and response object.

res.send 
Sends a response back to whoever made the request

-------req and res------------->

app.get("/users", (req, res) => {
    res.send("All Users");
});

These tow 
req and res  are object provided by Express.

-----Request------->

req = Request 
It contains information coming from the client to our server.

For example :
Client =>   Get /"products"    =>    req

The request can contain 

URL  / route parameter / query paremeter 
headers / body / http method

---------Responsse----------------->

It is what our server uses to send somthing back to the client 

For example : 

res.send("All User")

Means =>
Send "All User" back to the client.


-----Route parameter---------->

suppose we want : 

/users/5 

The 5 represent the user'ID

we define  : 

app.get("/user/:id"  , (req,res) => 
    {
const id = req.params.id;
res.sent('User ID : ${id})    
})

Now : /user/5 

return : User ID : 5

WHY => 

:id 
is a route parameter.

Express puts its value inside =>
req.params 

SO =>
req.params.id

---Remember this-------->

/users/:id
       ↑
       parameter

req.params.id
       ↑
       value

----Example-------->

/users/25 
req.params.id
25

--------Query Parameters------------>

A query prameter comes after ? 

Example =>
/products?category=mobile

here =>
    category=mobile => Is a query parameter

---Why do we need Query Parameter?-------->

Imagine your e-commerce API has 100 products.
The frontend might ask : 
"Give me products from the mobile category"

Insteaf of creating a different route: 
/products/mobile

we can use =>
    /products?category=mobile
Another example =>
    /products?category=mobile&sort=price

We can have muiltiple query parameters.

------------->

How Expresss reads them 

app.get("/products" , (req , res) => {
const category = req.query.category ;

res.send(`Category : ${category}`);
})

Now requst => 
    /products?category=mobile

Response :
Category : mobile 

Because => 
    req.query.category =>  mobile


------Route Params vs Query Params------->

This distinction is very important for your assingment.

Route Parameter =>
/products/10 
req.params.id 

// Usually identifies a specific resource.

Query parameter => 
/products?category=mobile 
req.query.category 

// Usually provides filtering , searching, sorting, pagination ,etc

--Think----->

/products/10  =>  WHICH product ?
/products?category=mobile => FILTER products


--------REQUEST BODY-------->

When you create a user or product with POST, 
The data will come inside the request body.

For Example : 

#JSON

{
"name":"iphone",
"price":500;
}

The backend needs a way to read this data.

Thats => 
// req.body

But first : express.json()
Express needs to be told: 

// When the client sends JSON data , 
// parse it so I can access it through  req.body.

We do that with => 
app.use(express.json());

so your server will now look like: 

#javascript =>

const express = require("express");

const app = express();

app.use(express.json());

app.get("/products", (req, res) => {
    const category = req.query.category;

    if (category) {
        res.send(`Product Category: ${category}`);
    } else {
        res.send("All Products");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


----Why-express.json()---->

Imagine Postman sends: 
{
  "name": "iPhone",
  "price": 500
}

Without 
app.use(express.json());

Express won't automatically give you that JSON as a usable Javascript object
throuh req.body .

--With it--->

req.body 
Becomes => 
{
    name: "iPhone",
    price: 500
}

Then => 
req.body.name
gives =>
iphone


// THE THREE REQUST DATA LOCATIONS 

PARAMS 
/products/10
req.params.id

QUERY 
/products?category=mobile 
req.query.category

BODY
{
"name" : "iphone",
"price" : 500
}

req.body.name
req.body.price

-------->

REQUEST
   │
   ├── params
   │      └── /products/10
   │
   ├── query
   │      └── ?category=mobile
   │
   └── body
          └── { name, price }


------------>

GET
 ↓
Read/request something

POST
 ↓
Send/create something

*/ 