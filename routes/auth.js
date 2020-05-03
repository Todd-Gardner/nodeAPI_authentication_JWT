const router = require("express").Router();

//Auth routes (/api/user/...)
router.post("/register", (req, res) => {
  res.send("Register page"); //display on page
});

module.exports = router;
