const express = require("express");
const upload = require("../middlewares/UploadUserProfileImage");
const {
  getAdminSettings,
  updateAdminProfile,
  updateCompanySettings,
  editTax,
  deleteATax,
  addNewTax,
  changePicture,
} = require("../controllers/Admin");
const adminRouter = express.Router();

adminRouter.post("/settings", getAdminSettings);
adminRouter.post("/update-profile", updateAdminProfile);
adminRouter.post("/update-company", updateCompanySettings);
adminRouter.post("/update-tax", editTax);
adminRouter.delete("/delete-tax", deleteATax);
adminRouter.post("/add-tax", addNewTax);
adminRouter.post("/picture", upload.single("image"), changePicture);

module.exports = adminRouter;
