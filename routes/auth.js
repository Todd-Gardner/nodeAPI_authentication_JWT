const router = require("express").Router();
const User = require('../models/User');

//Auth routes (/api/user/...)
router.post("/register", async (req, res) => {
  //res.send("Register page"); //send/display on page
  const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
  });
  try {
      const savedUser = await user.save();
      res.send(savedUser);
  } catch (error) {
      res.status(400).send(error); //if error, respond with status 400 and error message
  }
});

module.exports = router;
