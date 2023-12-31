const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const userRouter = require("./Routes/User");
const adminRouter = require("./Routes/Admin");
require("dotenv").config();

//middlewares
app.use(cors());
app.use(express.json());
app.use("/auth", userRouter);
app.use("/admin", adminRouter);
app.use("/public", express.static(path.join(__dirname, "public")));

//404 not found
app.use("*", (req, res) => {
  return res.status(404).json({ msg: "The requested thing was not found." });
});

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
