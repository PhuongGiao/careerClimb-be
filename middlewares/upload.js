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
    cb(new Error("file extension is noy allow"), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../upload"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage, fileFilter });

module.exports = upload;
