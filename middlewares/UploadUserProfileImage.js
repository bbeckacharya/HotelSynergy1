const path = require("path");
const multer = require("multer");
``;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, "../public/users");
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.id}.png`);
  },
});

const upload = multer({ storage });

module.exports = upload;
