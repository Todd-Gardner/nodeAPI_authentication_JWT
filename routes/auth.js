const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

//Auth routes (/api/user/...)
router.post("/register", async (req, res) => {
  //res.send("Register page"); //send/display on page

  //Validate before creating a User
  const { error } = registerValidation(req.body); //validate body with schema, returns object
  if (error) {
    console.log("error: ", error);
    return res.status(400).send(error.details[0].message);
  }

  //Check the DB to see if the user has already registered
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).send("That email is already registered!");

  //Hash the password
  //const salt = await bcrypt.genSalt(10); //returns a promise with salt if no callback
  const hashedPassword = await bcrypt.hash(req.body.password, 10); //replaced salt w/ 10

  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save(); //save/submit user
    res.send({ userId: user._id }); //respond back. (savedUser) is all info
  } catch (error) {
    res.status(400).send(error); //if error, respond with status 400 and error message
  }
});

//Login
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body); //validate body with schema, returns object
  if (error) {
    //console.log("error: ", error);
    return res.status(400).send(error.details[0].message);
  }
  //Check if the email already exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("EMAIL or password is wrong.");
  //Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Email or PASSWORD is wrong.");

  //Create and assign a Json Web Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token); //jwt.io debugger

  //res.send("Successfully logged in!");
});

module.exports = router;
