const nodemailer = require('nodemailer');
const { EMAIL_SERVICE, EMAIL, EMAIL_PW } = require('../config/config.js');

exports.sendEmail = function (toEmail, subject, content) {
  const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL,
      pass: EMAIL_PW,
    },
  });

  const mailOptions = {
    from: EMAIL,
    to: toEmail,
    subject: subject,
    html: content,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) console.log(error);
    else console.log('Email sent: ' + info.response);
  });
};
