const Company = require("../models/Company");
const User = require("../models/User");
const Tax = require("../models/Tax");
const bcrypt = require("bcrypt");
require("dotenv").config();

const getAdminSettings = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username)
      return res
        .status(400)
        .json({ msg: "Settings requested for and invalid user." });

    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({ msg: "The requested user was not found" });
    if (user.role != "admin")
      return res.status(401).json({ msg: "You can not access the admin page" });

    const userdetail = {
      username: user.username,
      name: user.name,
      role: user.role,
      password: "",
    };
    const company = await Company.findOne({});
    if (!company) return res.status(404).json({ msg: "Company was not found" });
    const companyDetails = {
      name: company.name,
      address: company.address,
      website: company.website,
      phoneOne: company.phoneOne,
      phoneTwo: company.phoneTwo,
    };
    const tax = await Tax.find({});
    if (!tax) return res.status(404).json({ msg: "Tax details was not found" });

    return res.status(200).json({
      tax,
      user: userdetail,
      company: companyDetails,
      image: user.image,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "There was an unknown internal server user." });
  }
};

const updateAdminProfile = async (req, res) => {
  const { name, username, role, password } = req.body;
  if (!username)
    return res
      .status(400)
      .json({ msg: "Settings being updated for invalid user." });

  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ msg: "The user was not found" });
  const updateName = await User.findOneAndUpdate({ username }, { name: name });
  if (!updateName)
    return res
      .status(500)
      .json({ msg: "Server error updating name, try again later." });
  if (!password) {
    return res.status(200).json({ msg: "Name updated successfully." });
  } else {
    const newPassword = await bcrypt.hash(password, 10);
    const updatePassword = await User.findOneAndUpdate(
      { username },
      { password: newPassword }
    );
    if (!updatePassword) {
      return res
        .status(500)
        .json({ msg: "Server error updating password, try again later." });
    }
    return res.status(200).json({ msg: "Profile updated successfully." });
  }
};

const updateCompanySettings = async (req, res) => {
  const { name, address, phoneOne, phoneTwo, website } = req.body;
  if (!name || !address || !phoneOne || !phoneTwo || !website) {
    return res.status(400).json({ msg: "All information are required." });
  }
  try {
    //query and update the company:: empty quary since there's only 1 company.
    const UpdatedCompanyInfo = await Company.findOneAndUpdate(
      {},
      {
        name,
        address,
        phoneOne,
        phoneTwo,
        website,
      }
    );
    if (UpdatedCompanyInfo) {
      return res.status(200).json({ msg: "Company Updated successfully." });
    } else return res.status(404).json({ msg: "Company was not found." });
  } catch (err) {
    return res.status(500).json({
      msg: "There was an internal server error, please try again later.",
    });
  }
};

const addNewTax = async (req, res) => {
  const { name, value } = req.body;
  if (!name || !value)
    return res.status(400).json({ msg: "Both name and value are required" });
  try {
    const newTax = await new Tax({
      name,
      value: Number(value),
    });
    await newTax.save();
    return res.status(200).json({ msg: "The new tax added successfully." });
  } catch (err) {
    return res.status(500).json({ msg: "There was an unknown server error." });
  }
};

const editTax = async (req, res) => {
  try {
    const { _id, name, value } = req.body;
    if (!_id) {
      return res.status(400).json({ msg: "Tax ID is required to be editied." });
    }
    if (!name || !value)
      return res
        .status(400)
        .json({ msg: "Name and value of tax is required." });
    const editedTax = await Tax.findOneAndUpdate({ _id }, { name, value });

    if (editedTax) {
      return res
        .status(200)
        .json({ msg: "Tax have been updated successfully." });
    } else
      return res.status(404).json({
        msg: "No tax with that ID to update.",
      });
  } catch (err) {
    return res.status(500).json({
      msg: "An unknown internal server error occoured while trying to update the tax information.",
    });
  }
};

const deleteATax = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id)
      return res
        .status(400)
        .json({ msg: "The tax ID is required to be deleted." });
    const deletedTax = await Tax.findOneAndDelete({ _id });
    if (!deletedTax) {
      console.log(deletedTax);
      return res.status(404).json({ msg: "The tax was not found to delete." });
    } else {
      return res
        .status(200)
        .json({ msg: "The tax has been deleted successfully." });
    }
  } catch (err) {
    return res.status(500).json({
      msg: "There was an unknown error while deleting the tax details.",
    });
  }
};

const changePicture = async (req, res) => {
  const { id } = req.body;
  const imagePath = req.file.path;
  const userInDB = await User.findOneAndUpdate(
    { _id: id },
    {
      image: `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/public/users/${id}.png`,
    }
  );
  if (userInDB) {
    return res.status(200).json({ msg: "Image Uploaded Successfully." });
  }
  return res
    .status(400)
    .json({ msg: "The user was not found to update image." });
};

module.exports = {
  getAdminSettings,
  updateAdminProfile,
  updateCompanySettings,
  addNewTax,
  editTax,
  deleteATax,
  changePicture,
};
