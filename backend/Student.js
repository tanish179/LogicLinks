const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: { type: String, unique: true },
  password: String,

  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastAttendanceDate: { type: String, default: null }
});

module.exports = mongoose.model("Student", studentSchema);