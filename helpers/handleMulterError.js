const multer = require('multer');

const handleMulterError = (error, data, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      error.message = 'File is to large';
      error.code = 400;
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      error.message = 'File limit reached';
      error.code = 400;
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      error.message = 'File must be an image type';
      error.code = 400;
    }
  }
  next();
};

module.exports = handleMulterError;
