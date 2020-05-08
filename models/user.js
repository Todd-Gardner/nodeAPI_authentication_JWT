const mongoose = require("mongoose");

//*** min and max not working ***/
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 1024,
    },
    //Changed to use timestamp
    /* date: {
      type: Date,
      default: Date.now,
    }, */
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
