const router = require("express").Router();
const User = require("../models/User");

//error
const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(8).required(),
});

//Auth routes (/api/user/...)
router.post("/register", async (req, res) => {
  //res.send("Register page"); //send/display on page

  //Validate before creating a User
  const { error } = schema.validate(req.body); //validate body with schema, returns object
  if (error) {
    console.log("error", error);
    return res.status(400).send(error.details[0].message);
  }

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
