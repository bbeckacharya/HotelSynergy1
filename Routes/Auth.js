const express = require("express");
const { firstUser, login } = require("../controllers/Auth");

const authRouter = express.Router();

authRouter.get("/setup", firstUser);
authRouter.post("/login", login);

module.exports = authRouter;
