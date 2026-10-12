const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect("mongodb+srv://dhanshree_db_user:dhanu666@cluster0.qp4k9nz.mongodb.net/webdemo?appName=Cluster0")
    .then(() => {
        console.log("MongoDB Atlas connected");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });

// Volunteer Schema
const Volunteer = mongoose.model("Volunteer", {
    name: String,
    city: String,
    experience: String
});

// Get volunteers
app.get("/volunteers", async (req, res) => {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
});

// Add volunteer
app.post("/volunteers", async (req, res) => {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();
    res.json(volunteer);
});

// Start server
app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});