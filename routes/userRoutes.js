const express = require("express");

const router = express.Router();

const users = require("../data/users");
const apikey = require("../middleware/apikeys");

// GET all users
router.get("/", apikey, (req, res) => {
  res.status(200).json({
    status: true,
    message: "Users fetched successfully",
    data: users
  });
});

// GET single user
router.get("/:id", apikey, (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User Not Found"
    });
  }

  res.status(200).json({
    status: true,
    message: "User fetched successfully",
    data: user
  });
});

// POST user
router.post("/", apikey, (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  if (!name || !email) {
    return res.status(400).json({
      status: false,
      message: "Name and Email are required"
    });
  }

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      status: false,
      message: "Name must be a valid string"
    });
  }

  if (typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({
      status: false,
      message: "Invalid email"
    });
  }

  const newUser = {
    id: Date.now(),
    name: name.trim(),
    email
  };

  users.push(newUser);

  res.status(201).json({
    status: true,
    message: "User created successfully",
    data: newUser
  });
});

// PUT user
router.put("/:id", apikey, (req, res) => {
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

  if (!name || !email) {
    return res.status(400).json({
      status: false,
      message: "Name and Email are required"
    });
  }

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      status: false,
      message: "Name must be a valid string"
    });
  }

  if (typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({
      status: false,
      message: "Invalid email"
    });
  }

  user.name = name.trim();
  user.email = email;

  res.status(200).json({
    status: true,
    message: "User updated successfully",
    data: user
  });
});

// DELETE user
router.delete("/:id", apikey, (req, res) => {
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