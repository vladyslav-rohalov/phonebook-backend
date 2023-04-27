const nodemailer = require('nodemailer');
require('dotenv').config();

const { EMAIL_PASSWORD } = process.env;

const config = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: 'confirm_registration@ukr.net',
    pass: EMAIL_PASSWORD,
  },
};

const sendEmail = async data => {
  const transporter = nodemailer.createTransport(config);
  const emailOptions = { ...data, from: 'confirm_registration@ukr.net' };
  await transporter.sendMail(emailOptions);
  return true;
};

module.exports = sendEmail;
