const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//user authentication with username and password.
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username)
      return res.status(400).json({ msg: "Username is required." });
    if (!password)
      return res.status(400).json({ msg: "Password is required." });

    //search user in DB
    const userInDB = await User.findOne({ username });
    if (!userInDB) return res.status(404).json({ msg: "User not found" });

    //check password
    const isPasswordMatched = await bcrypt.compare(password, userInDB.password);
    if (!isPasswordMatched)
      return res
        .status(401)
        .json({ msg: "Wrong password, please recheck and try again." });

    //now sign token and give a cookie :)
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    // TODO: make the cookie secure and cors.
    res.cookie("authdata", token, { secure: true, HttpOnly: true });

    return res.status(200).json({
      msg: "User logged in successfully.",
      user: {
        name: userInDB.name,
        username,
        image: userInDB.image,
        role: userInDB.role,
      },
    });
  } catch (err) {
    return res.status(500).json({
      msg: "An unknown internal server error occured, please try again later.",
    });
  }
};

//to be fired first time to make default user.
const firstUser = async (req, res) => {
  try {
    //look if any user is already in DB
    const users = await User.find({});

    if (users.length > 0)
      return res.status(400).json({ msg: "This is not your first time." });
    if (users.length === 0) {
      //hash default admin
      const encryptedPassword = await bcrypt.hash("admin", 10);
      //create default user and save
      const defaultUser = await new User({
        username: "admin",
        password: encryptedPassword,
      });
      await defaultUser.save();
      return res
        .status(200)
        .json({ msg: "Default admin user added successfully." });
    }
  } catch (err) {
    return res.status(500).json({
      msg: "An unknown internal server error occoured. Please try again later.",
    });
  }
};

module.exports = { login, firstUser };
