const router = require("express").Router();
const verify = require("./verifyToken");

//can search for the individual users info / posts
//have access to user after verify

router.get("/", verify, (req, res) => {
  res.json({
    posts: {
      title: "You have to log in to view",
      description: "NodeJS API with Authentication and JWT",
    },
  });
  //res.send(req.user); //gets back the user _id and date the token was created
  //User.findByOne({ _id: req.user }); //finds everything for that user
});

module.exports = router;
