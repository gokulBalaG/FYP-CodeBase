const crypto = require('crypto');
const express = require('express');
const { model } = require('../../model/model.js');
const { utils } = require('../../utils/utils.js');
const { config } = require('../../config/config.js');

const ifNoUser = function (res) {
  const toRender = {
    msg: 'User not found',
  };

  return res.render('reset-pass', { toRender });
};

const ifNoToken = function (res) {
  const toRender = {
    msg: 'Invalid or expired link',
  };

  return res.render('reset-pass', { toRender });
};

const forgotPassword = function (req, res) {
  const toRender = {
    formUrl: '/reset-password',
    formLabel: 'Enter your registered email ID',
    inputClass: 'email',
    inputName: 'username',
    placeholder: 'example@email.com',
    btnText: 'Get reset password link',
  };

  res.render('reset-pass', { toRender });
};

const forgotPwInputEmail = async function (req, res) {
  const user = await model.User.findOne({ username: req.body.username });

  if (!user) return ifNoUser(res);

  let token = await model.Token.findOne({ userId: user._id });
  if (!token) {
    token = await new model.Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex'),
    }).save();
  }

  const link = `${config.BASE_URL}/reset-password/${user._id}/${token.token}`;

  const markup = `<p>${config.passwordResetContent}</p>
    <a href="http://${link}" target="_blank">Click here!</a>`;

  utils.sendEmail(user.username, config.passwordResetSubject, markup);

  const toRender = {
    msg: 'Password reset link has been sent to your email!',
  };

  res.render('reset-pass', { toRender });
};

const pwResetLink = async function (req, res) {
  const user = await model.User.findById(req.params.userId);

  if (!user) return ifNoUser(res);

  const token = await model.Token.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!token) return ifNoToken(res);

  const toRender = {
    formUrl: `/reset-password${req.url}`,
    formLabel: 'Enter new password',
    inputClass: 'password',
    inputName: 'password',
    placeholder: 'New password',
    btnText: 'Reset password',
    pwMinLen: config.PASSWORD_MIN_LEN,
  };

  res.render('reset-pass', { toRender });
};

const registerNewPassword = async function (req, res) {
  const user = await model.User.findById(req.params.userId);

  if (!user) return ifNoUser(res);

  const token = await model.Token.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!token) return ifNoToken(res);

  await token.delete();

  await user.setPassword(req.body.password, function (err, user) {
    if (err) console.log(err);
    else {
      
      const content = `${
        config.passwordResetSuccessContent
      } <strong>${utils.generateDateString()}</strong>`;

      utils.sendEmail(
        user.username,
        config.passwordResetSuccessSubject,
        content
      );

      user.save();
      res.redirect(`/login?signinAgain=true`);
    }
  });
};

const rpRouter = express.Router();

rpRouter.get(`/`, forgotPassword);
rpRouter.post(`/`, forgotPwInputEmail);
rpRouter.get(`/:userId/:token`, pwResetLink);
rpRouter.post(`/:userId/:token`, registerNewPassword);

exports.resetPasswordRouter = rpRouter;
