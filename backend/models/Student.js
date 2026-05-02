const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: { type: String, unique: true },   // ✅ prevent duplicate
  subject: String,
  marks: Number
});

module.exports = mongoose.model("Student", studentSchema);