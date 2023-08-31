const mongoose = require("mongoose");
const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  phoneOne: {
    type: Number,
  },
  phoneTwo: {
    type: Number,
  },
  website: {
    type: String,
  },
});

module.exports = mongoose.model("Company", CompanySchema, "CompanyInformation");
