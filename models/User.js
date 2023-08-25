const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  image: {
    type: String,
    default: "/user.png",
  },
  name: {
    type: String,
    default: "Hari Acharya",
  },
  username: {
    default: "admin",
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "admin",
  },
});

module.exports = mongoose.model("User", UserSchema, "Users");
