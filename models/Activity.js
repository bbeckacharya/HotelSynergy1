const mongoose = require("mongoose");
const ActivityLogSchema = new mongoose.Schema({
  user: { type: String },
  action: { type: String },
  dateandtime: { type: String },
  performedby: { type: String },
});

module.exports = mongoose.model(
  "UserActivity",
  ActivityLogSchema,
  "UserActivities"
);
