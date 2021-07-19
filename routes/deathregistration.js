const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const DeathRegistration = require("../models/DeathRegistration");

//@route  GET api/deathregistration
//desc     Get all deathregistration
//@access  Private
router.get("/", auth, async (req, res) => {
  try {
    const deathregistration = await DeathRegistration.find({
      user: req.user.id,
    }).sort({ date: -1 });
    res.json(deathregistration);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  POST api/deathregistration
//desc     Add New deathregistration
//@access  Private
router.post(
  "/",
  [auth, [check("firstName", "First Name is required")]],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const {
      firstName,
      lastName,
      fatherName,
      motherName,
      relationship,
      wardNumber,
      deathdate,
      deathtime,
      dob,
      causeofdeath,
      date,
      status,
    } = req.body;

    try {
      const newdeathregistration = new DeathRegistration({
        firstName,
        lastName,
        fatherName,
        motherName,
        relationship,
        wardNumber,
        deathdate,
        deathtime,
        dob,
        causeofdeath,
        date,
        status,
        user: req.user.id,
      });
      const deathregistration = await newdeathregistration.save();
      res.json(deathregistration);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route  Update api/deathregistration
//desc     Update deathregistration
//@access  Private

router.put("/:id", auth, async (req, res) => {
  //   res.json({ meg: "Update deathregistration" });

  const {
    firstName,
    lastName,
    fatherName,
    motherName,
    relationship,
    wardNumber,
    deathdate,
    deathtime,
    dob,
    causeofdeath,
    date,
    status,
  } = req.body;
  // Build Deathregistration onject
  const deathregistrationfield = {};
  if (firstName) deathregistrationfield.fatherName = firstName;
  if (lastName) deathregistrationfield.flastName = lastName;
  if (fatherName) deathregistrationfield.fatherName = fatherName;
  if (motherName) deathregistrationfield.motherName = motherName;
  if (relationship) deathregistrationfield.relationship = relationship;
  if (wardNumber) deathregistrationfield.wardNumber = wardNumber;
  if (deathdate) deathregistrationfield.deathdate = deathdate;
  if (deathtime) deathregistrationfield.deathtime = deathtime;
  if (dob) deathregistrationfield.dob = dob;
  if (causeofdeath) deathregistrationfield.causeofdeath = causeofdeath;
  if (date) deathregistrationfield.date = date;
  if (status) deathregistrationfield.status = status;

  try {
    let deathregistration = await DeathRegistration.findById(req.params.id);
    if (!deathregistration) {
      return res.status(404).json({ msg: "Registration Not Found" });
    }
    if (deathregistration.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }
    deathregistration = await DeathRegistration.findByIdAndUpdate(
      req.params.id,
      { $set: deathregistrationfield },
      { new: true }
    );
    res.json(deathregistration);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  Remove api/deathregistration
//desc     Remove deathregistration
//@access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let deathregistration = await DeathRegistration.findById(req.params.id);
    if (!deathregistration) {
      return res.status(404).json({ msg: "Registration Not Found" });
    }
    if (deathregistration.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }
    await DeathRegistration.findByIdAndRemove(req.params.id);

    res.json({ msg: "Death Registration Remove" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

  //   res.json({ meg: "Remove Deathregistration" });
});
module.exports = router;
