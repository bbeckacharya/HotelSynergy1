const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();

//connect db and run server.
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB Connected Successfully.");
    app.listen(process.env.SERVER_PORT, () => {
      console.log(
        `Server stated successfully at port: ${process.env.SERVER_PORT}`
      );
    });
  })
  .catch(() => {
    console.log("There was an error connecting to the DB");
  });
