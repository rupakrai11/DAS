const mongoose = require("mongoose");
const DeathRegistrationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
  wardNumber: {
    type: String,
    required: true,
  },
  deathdate: {
    type: String,
    required: true,
  },
  deathtime: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  causeofdeath: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: "String",
    default: "Pending",
  },
});
module.exports = mongoose.model("deathregistration", DeathRegistrationSchema);
