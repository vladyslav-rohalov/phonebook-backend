const multer = require('multer');
// const path = require('path');

// const tempDir = path.join(__dirname, '../', 'temp');

// const multerConfig = multer.diskStorage({
//   destination: tempDir,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: multerConfig,
//   limits: { fileSize: 5000000, files: 1 },
// });

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(new Error('Wrong file format, type should be image'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5000000, files: 1 },
});

module.exports = upload;
