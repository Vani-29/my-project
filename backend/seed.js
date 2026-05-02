const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb://127.0.0.1:27017/collegeDB");

const users = [
  { email: "student@gmail.com", password: "1234", role: "student" },
  { email: "teacher@gmail.com", password: "1234", role: "teacher" },
  { email: "admin@gmail.com", password: "1234", role: "admin" }
];

async function seed() {
  await User.deleteMany();
  await User.insertMany(users);
  console.log("Users added");
  process.exit();
}

seed();