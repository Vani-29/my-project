const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

console.log("AUTH ROUTE FILE LOADED ✔");

// TEST ROUTE
router.get("/test", (req, res) => {
  res.send("AUTH ROUTE WORKING ✔");
});

// LOGIN ROUTE
router.post("/login", (req, res) => {
  const { email } = req.body;

  let role = "student";

  if (email.includes("teacher")) role = "teacher";
  else if (email.includes("admin")) role = "admin";

  const token = jwt.sign({ email, role }, "secret");

  res.json({ token, role });
});

module.exports = router;