const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
{
  title: String,
  date: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);