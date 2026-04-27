const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
{
  name: String,
  teacher: String,
  room: String,
  time: String
},
{ timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);