const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: String,
  className: String,
  date: String,
  status: String
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
