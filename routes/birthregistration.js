const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const BirthRegistration = require("../models/BirthRegistration");
const config = require("config");
const User = require("../models/User");

//@route    GET api/contacts
//desc      Get all users Registration
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    const birthregistration = await BirthRegistration.find({
      user: req.user.id,
    }).sort({ date: -1 });
    res.json(birthregistration);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/registration
//desc      Add new  Registration
//@access   Private
router.post(
  "/",
  [auth, [check("firstName", "Firest Name is required").not().isEmpty()]],
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
      grandFatherName,
      wardNumber,
      religion,
      dob,
      status,
    } = req.body;

    try {
      const newBirthRegistration = new BirthRegistration({
        firstName,
        lastName,
        fatherName,
        motherName,
        grandFatherName,
        wardNumber,
        religion,
        dob,
        status,
        user: req.user.id,
      });

      const birthregistration = await newBirthRegistration.save();
      res.json(birthregistration);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    PUT api/birthregistration/:id
//desc      Update Birthregistration
//@access   Private
router.put("/:id", auth, async (req, res) => {
  const {
    firstName,
    lastName,
    fatherName,
    motherName,
    grandFatherName,
    wardNumber,
    religion,
    dob,
    status,
  } = req.body;

  // Build Birthregistration object
  const birthregistrationfield = {};
  if (firstname) birthregistrationfield.firstName = firstName;
  if (lastName) birthregistrationfield.lastName = lastName;
  if (fatherName) birthregistrationfield.fatherName = fatherName;
  if (motherName) birthregistrationfield.motherName = motherName;
  if (grandFatherName) birthregistrationfield.grandFatherName = grandFatherName;
  if (wardNumber) birthregistrationfield.wardNumber = wardNumber;
  if (religion) birthregistrationfield.religion = religion;
  if (dob) birthregistrationfield.dob = dob;
  if (status) birthregistrationfield.status = status;

  try {
    let birthregistration = await BirthRegistration.findBId(req.params.id);
    if (birthregistration.user.toString !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }
    birthregistration = await BirthRegistration.findByIdAndUpdate(
      req.params.id,
      { $set: birthregistrationfield },
      { new: true }
    );
    res.json(birthregistration);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    DELETE api/contacts/:id
//desc      Delete registration
//@access   Private
router.delete("/:id", (req, res) => {
  res.send("Delete registration");
});
module.exports = router;
