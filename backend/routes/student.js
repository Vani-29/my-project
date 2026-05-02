const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// ADD
router.post("/add", async (req, res) => {
  try {
    const existing = await Student.findOne({ rollNo: req.body.rollNo });

    if (existing) {
      return res.status(400).json({ msg: "Student already exists" });
    }

    const student = new Student(req.body);
    await student.save();

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET
router.get("/", async (req, res) => {
  const data = await Student.find();
  res.send(data);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const data = await Student.findByIdAndUpdate(req.params.id, req.body);
  res.send(data);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});


module.exports = router;