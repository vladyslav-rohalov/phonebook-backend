const { nanoid } = require('nanoid');
const { S3 } = require('aws-sdk');
const { AWS_BUCKET_NAME } = process.env;

exports.s3UploadV2 = async file => {
  const s3 = new S3();

  const param = {
    Bucket: AWS_BUCKET_NAME,
    Key: `avatars/${nanoid()}-${file.originalname}`,
    Body: file.buffer,
  };
  return s3.upload(param).promise();
};

exports.s3DeleteV2 = async fileName => {
  const s3 = new S3();

  const param = {
    Bucket: AWS_BUCKET_NAME,
    Key: `avatars/${fileName}`,
  };
  return s3.deleteObject(param).promise();
};
// module.exports = { s3UploadV2, s3DeleteV2 };
