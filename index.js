const express = require("express");
const app = express();

//Import routes
const authRoute = require("./routes/auth");

//Route Middlewares
app.use("/api/user", authRoute); // when go to /user - use authRoute

app.listen(3000, () => console.log("----- Server started -----"));

//toddG
