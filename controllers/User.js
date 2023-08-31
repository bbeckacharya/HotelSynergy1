const User = require("../models/User");
const Activity = require("../models/Activity");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Company = require("../models/Company");
const Tax = require("../models/Tax");
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
        id: userInDB._id,
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

//to be fired first time to make default user. and company.
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
      const newCompany = await new Company({
        name: "Example Company",
        phoneOne: 9849951111,
        phoneTwo: 9800000000,
        website: "www.hari-acharya.com.np",
        address: "Siremal PO.Box. 33258 Kinyo Street, Tokyo, Japan",
      });
      await newCompany.save();
      const defaultTax = await new Tax({
        name: "VAT",
        value: 13.0,
      });
      await defaultTax.save();
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

const getUserList = async (req, res) => {
  //TODO: get user list.
  const users = await User.find({}, "-password -__v");
  return res.status(200).json({ users });
};

const changePassword = async (req, res) => {
  try {
    const { user, password } = req.body;
    const userInDB = await User.findOne({ _id: user });
    if (!userInDB)
      return res.status(404).json({ msg: "That user was not found." });
    const newPassword = await bcrypt.hash(password, 10);
    await userInDB.updateOne({ password: newPassword });
    return res.status(200).json({ msg: "Password changed successfully." });
  } catch (err) {
    return res.status({
      msg: "Error updating password, please try again later.",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req.body;
    if (!user)
      return res.status(400).json({ msg: "User is required to be deleted." });
    const userInDB = await User.findOne({ _id: user });
    if (userInDB.role === "admin") {
      const allAdmins = await User.find({ role: "admin" });
      if (allAdmins.length === 1) {
        return res
          .status(400)
          .json({ msg: "Only one admin can not be deleted." });
      }
    }
    const deletedUser = await User.findOneAndDelete({ _id: user });
    if (!deletedUser) {
      return res.status(404).json({ msg: "The user was not found to delete." });
    } else {
      return res.status(200).json({ msg: "User deleted successfully." });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Unknown server error occoured." });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, username, role, password } = req.body;
    if (!name || !username || !role || !password)
      return res.status(400).json({ msg: "All fields are required." });
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      role,
      username,
      password: encryptedPassword,
    });
    await newUser.save();
    return res.status(200).json({ msg: "User added successfully." });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Sorry, there was an error adding that user." });
  }
};

const getActivity = async (req, res) => {
  try {
    const activities = await Activity.find({});
    if (activities.length === 0) {
      return res.status(404).json({ msg: "No activities to show." });
    }
    return res.status(200).json({ activities });
  } catch (err) {
    return res.status(500).json({
      msg: "There was an internal server error, please try again later.",
    });
  }
};

module.exports = {
  login,
  firstUser,
  getUserList,
  changePassword,
  deleteUser,
  createUser,
  getActivity,
};
