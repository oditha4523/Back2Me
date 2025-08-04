const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // folder to store images
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Optional: file filter (accept only jpg, jpeg, png)
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only! (jpeg, jpg, png)');
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
