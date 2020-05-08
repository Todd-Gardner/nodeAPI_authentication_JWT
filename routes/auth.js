const router = require("express").Router();
const User = require("../models/User");
const { registerValidation } = require("../validation");

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

  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save(); //save/submit user
    res.send(savedUser); //display on screen
  } catch (error) {
    res.status(400).send(error); //if error, respond with status 400 and error message
  }
});

module.exports = router;
