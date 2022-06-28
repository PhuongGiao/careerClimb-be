const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
  //check extension trc khi upload
  const allowed = [".jpg", ".png", ".gif", ".jpeg"];
  const fileExtension = path.extname(file.originalname);
  const regex = new RegExp(`(${allowed.join("|")})$`, "i");
  if (regex.test(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error("file extension is not allow"), false);
  }
};

const upload = multer({ fileFilter });

module.exports = upload;
