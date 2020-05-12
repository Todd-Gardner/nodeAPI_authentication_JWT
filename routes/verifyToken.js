const jwt = require("jsonwebtoken");

//Create middleware - Import this function to any route that you want 'private'
module.exports = function(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied.");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next(); //Go to next middleware
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};
