const nodemailer = require('nodemailer');
const { config } = require('../config/config.js');

exports.sendEmail = function (toEmail, subject, content) {
  const transporter = nodemailer.createTransport({
    service: config.EMAIL_SERVICE,
    auth: {
      user: config.EMAIL,
      pass: config.EMAIL_PW,
    },
  });

  const mailOptions = {
    from: config.EMAIL,
    to: toEmail,
    subject: subject,
    html: content,
  };

  try {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) console.log(error);
      else console.log('Email sent: ' + info.response);
    });
  } catch (error) {
    console.log(error);
  }
};
