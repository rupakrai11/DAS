const mongoose = require("mongoose");
const User = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  wardnumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "public",
  },
});

module.exports = mongoose.model("user", User);
