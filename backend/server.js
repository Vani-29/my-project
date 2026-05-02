const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");

const app = express();


app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/students", studentRoutes);


app.listen(5000, () => console.log("Server running on 5000"));