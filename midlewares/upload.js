const multer = require('multer');

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
