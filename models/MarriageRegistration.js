const mongoose = require("mongoose");
const MarriageRegistrationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  hubandsName: {
    type: String,
    required: true,
  },
  wifeName: {
    type: String,
    required: true,
  },
  hdob: {
    type: String,
    required: true,
  },
  wdob: {
    type: String,
    required: true,
  },
  hoccupation: {
    type: String,
    required: true,
  },
  woccupation: {
    type: String,
    required: true,
  },
  marraiagedate: {
    type: String,
    required: true,
  },
  marraiagetype: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    default: "pending",
  },
  secondD: {
    type: String,
    default: "pending",
  },
  marriageRegistrationdate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("marriage", MarriageRegistrationSchema);
