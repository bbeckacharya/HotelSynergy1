const mongoose = require("mongoose");
const TaxSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  value: {
    type: Number,
  },
});

module.exports = mongoose.model("Tax", TaxSchema, "TaxSettings");
