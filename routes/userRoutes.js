const express = require("express")

const users = require("../data/users")

const router =  express.Router()

router.get("/" , (req,res) => {
  res.json(users)
})


// ------------->


router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User Not Found"
    });
  }

  res.json(user);
});


// ------------>

router.post("/", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  if (!name || !email) {
    return res.status(400).json({
      status: false,
      message: "Name and Email are required"
    });
  }

  const newUser = {
    id: Date.now(),
    name,
    email
  };

  users.push(newUser);

  res.status(201).json(newUser);
});


// ----------->


router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const name = req.body.name;
  const email = req.body.email;

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User Not Found"
    });
  }

  user.name = name;
  user.email = email;

  res.json(user);
});


// ----------->

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({
      status: false,
      message: "Invalid user id"
    });
  }

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: false,
      message: "User Not Found"
    });
  }

  users.splice(index, 1);

  res.status(200).json({
    status: true,
    message: "User Deleted"
  });
});


module.exports = router;