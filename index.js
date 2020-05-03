const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose"); //to connect to mongoDB

//Import routes
const authRoute = require("./routes/auth");

dotenv.config(); //initiate env variables

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to the database!");
  }
);

//Middlewares
app.use(express.json());
//Route Middlewares
app.use("/api/user", authRoute); // when go to /user - use authRoute


app.listen(3000, () => console.log("----- Server started -----"));

//toddG
