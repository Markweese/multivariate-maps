const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');


exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login'
});

exports.generateSessionToken =  async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  user.sessionToken = crypto.randomBytes(20).toString('hex');

  await user.save();

  req.flash('success', 'You are now logged in');
  res.redirect('/list');
};

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'Logged Out');
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
  // first check if the user is authenticated
  if (req.isAuthenticated()) {
    next(); // carry on! They are logged in!
    return;
  }
  req.flash('error', 'You have to <a href="/login">LOG IN</a> to visit this page');
  res.redirect('/login');
};

exports.forgot = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if(!user){
    req.flash('error', `No account with that email exists`);
    return res.redirect('/signup');
  }
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000;

  await user.save();

  const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
  await mail.send({
    user: user,
    subject: 'Password Reset',
    resetURL,
    filename: 'password-reset'
  });

  req.flash('success', `A password reset has been sent`);
  res.redirect('/login');
};

exports.reset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
   });

   if(!user) {
    req.flash('Error', 'Password reset is invalid or expired');
    res.redirect('/login');
   }

   res.render('reset', { title: 'Reset Your Password' });
};

exports.confirmPassword = (req, res, next) => {
  if(req.body['new-password'] === req.body['confirm-password']) {
    next();
    return;
  }

  req.flash('error', 'Your passwords don\'t match');
  res.redirect('back');
}

exports.updatePassword = async (req, res) => {
  const user = await User.findOne(
    { resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if(!user){
      req.flash('error', 'Password reset is invalid or expired');
      res.redirect('/login');
    }

    const setPassword = promisify(user.setPassword, user);
    await setPassword(req.body['new-password']);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    const updateUser = await user.save();
    await req.login(updateUser);

    req.flash('success', 'Your password has been reset');
    res.redirect('/');
}

exports.updateAccountPassword = async (req, res) => {
  const user = await User.findOne({
    _id: req.user._id
  });

  const setPassword = promisify(user.setPassword, user);
  await setPassword(req.body['new-password']);

  const updateUser = await user.save();
  await req.login(updateUser);

  req.flash('success', 'Your password has been reset');
  res.redirect('/account');
}
