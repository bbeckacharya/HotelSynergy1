const express = require("express");
const {
  firstUser,
  login,
  getUserList,
  changePassword,
  deleteUser,
  createUser,
  getActivity,
} = require("../controllers/User");
const authRouter = express.Router();

authRouter.get("/setup", firstUser);
authRouter.post("/login", login);
authRouter.get("/users", getUserList);
authRouter.post("/reset", changePassword);
authRouter.delete("/delete", deleteUser);
authRouter.post("/add", createUser);
authRouter.get("/activity", getActivity);

module.exports = authRouter;
