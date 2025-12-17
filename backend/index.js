require("dotenv").config();

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const connectDB = require("./db");
const Student = require("./student");

const app = express();
app.use(cors());
app.use(express.json());

// Simple QR generator endpoint (lightweight, does not require DB)
let activeQR = null;
app.get('/qr/generate', (req, res) => {
  activeQR = {
    token: crypto.randomBytes(8).toString('hex'),
    expiresAt: Date.now() + 30000,
    scanned: []
  };
  res.json(activeQR);
});

// Test routes
app.get("/", (req, res) => {
  res.send("ClassSense Backend Running 🚀");
});

app.get("/health", (req, res) => {
  res.send("Backend Connected 🚀");
});

// Add student
app.post("/student/add", async (req, res) => {
  try {
    const { name, rollNo } = req.body;

    if (!name || !rollNo) {
      return res.status(400).json({ error: "Name & RollNo required" });
    }

    const exists = await Student.findOne({ rollNo });
    if (exists) {
      return res.status(400).json({ error: "Student already exists" });
    }

    const student = await Student.create({ name, rollNo });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all students
app.get("/student/all", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

const PORT = process.env.PORT || 3000;

(async () => {
  const connected = await connectDB();
  if (!connected) console.log("⚠️ Mongo not connected");

  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );
})();
