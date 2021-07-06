const mongoose = require("mongoose");
const BirthRegistrationSchema = mongoose.Schema({
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
  grandFatherName: {
    type: String,
    required: true,
  },
  wardNumber: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("birthregistration", BirthRegistrationSchema);
