const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ["student", "faculty"], required: true },
  name: String,
  userId: { type: String, unique: true },
  password: String,
  className: String,

  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastAttendanceDate: String
});

module.exports = mongoose.model("User", userSchema);
