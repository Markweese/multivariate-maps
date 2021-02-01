const states = require('../data/states');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require('crypto');
const promisify = require('es6-promisify');
const fs = require('fs');

exports.loginForm = (req, res) => {
  let prepopulate = req.query.user ? req.query.user : null;

  res.render('login', { title: 'Login', prepopulate});
};

exports.registerForm = async (req, res) => {
  const checkusername = await User.find({}, {'_id':0, 'name':1}).then(names => {
    return names.map(username => {
      return username.name;
    });
  });

  if (!req.user) {
    res.render('signup', { title: 'Sign Up', states, checkusername });
  } else {
    res.redirect('/list');
  }
};

exports.validateRegister = (req, res, next) => {
  req.sanitize('name').blacklist('<>\{\}\$:\(\);\'\"\/');
  req.sanitize('email').blacklist('<>\{\}\$:\(\);\'\"\/');
  req.checkBody('name', 'You must supply a name').notEmpty();
  req.checkBody('origin', 'Supply A Home State').notEmpty();
  req.checkBody('email', 'That Email is not valid').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('new-password', 'Password Cannot be Blank').notEmpty();
  req.checkBody('confirm-password', 'Confirmed Password cannot be blank').notEmpty();
  req.checkBody('confirm-password', 'Looks like your passwords didn\'t match').equals(req.body['new-password']);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('signup', { title: 'Sign Up', states, body: req.body, flashes: req.flash() });
    return;
  }
  next();
};

exports.register = async (req, res) => {
  const sessionToken = crypto.randomBytes(20).toString('hex')
  const user = new User({ email: req.body.email, name: req.body.name, origin: req.body.origin.toLowerCase(), sessionToken});
  const register = promisify(User.register, User);

  try {
    const newUser = await register(user, req.body['new-password']);
    req.login(newUser);
    req.flash('success', 'You are now registered. <a href="/explorer">Visit the explorer</a> to begin adding stations.');
    res.redirect('/');
  } catch(e) {
    if(e.name === 'UserExistsError'){
      req.flash('error', `${req.body.email} is already in use. Please <a href='/login?user=${req.body.email}'>log in</a> if you already have an account, or <a href='/login?user=${req.body.email}#forgotPassword'>reset your password</a>`);
      res.redirect('back');
      return;
    } else {
      req.flash('error', `There was an issue processing your registration`);
      res.redirect('back');
    }
  }
};

exports.addUserPhoto = (req, res) => {
    const fileRecievedFromClient = req.file; //File Object sent in 'photo' field in multipart/form-data
    console.log(req.file)

    // let form = new FormData();
    // form.append('photo', fileRecievedFromClient.buffer, fileRecievedFromClient.originalname);
    // console.log(form)
    // axios.post('/api/upload-user-photo', form, {
    //         headers: {
    //             'Content-Type': `multipart/form-data; boundary=${form._boundary}`
    //         }
    //     }).then((responseFromServer2) => {
    //         res.send("SUCCESS")
    //     }).catch((err) => {
    //         res.send("ERROR")
    //     })
};

exports.account = async (req, res) => {
  const checkusername = await User.find({}, {'_id':0, 'name':1}).then(names => {
    return names.map(username => {
      return username.name;
    });
  });

  res.render('account', {title: 'Edit your account', states, checkusername});
}
exports.updateAccountBasic = async (req, res) => {
  const checkusername = await User.find({}, {'_id':0, 'name':1}).then(names => {
    return names.map(username => {
      return username.name;
    });
  });

  req.sanitize('name').blacklist('<>\{\}\$:\(\);\'\"\/');
  req.checkBody('name', 'You must supply a name').notEmpty();
  req.checkBody('origin', 'Supply A Home State').notEmpty();

  const errors = req.validationErrors();

  // catch validation errors
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.redirect('/account');
    return;
  } else {
    const updates = {
      name: req.body.name,
      origin: req.body.origin
    }

    // Catch db write errors
    try {
      await User.findOneAndUpdate(
        {_id: req.user._id},
        {$set: updates}
      );
    } catch(e) {
      if(e.errors.name.path === 'name') {
        req.flash('error', `New username must be unique`);
        res.redirect('/account');
        return;
      } else {
        req.flash('error', `There was an issue processing your request`);
        res.redirect('/account');
        return;
      }
    }
  }

  req.flash('success', 'Account updated');
  res.redirect('/account');
}
exports.updateAccountEmail = async (req, res) => {
  const user = await User.findOne({_id: req.user._id});
  const checkusername = await User.find({}, {'_id':0, 'name':1}).then(names => {
    return names.map(username => {
      return username.name;
    });
  });

  req.sanitize('email').blacklist('<>\{\}\$:');
  req.checkBody('email', 'That Email is not valid').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });

  const errors = req.validationErrors();

  // catch validation errors
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.redirect('/account');
    return;
  } else {
    // catch db write errors
    try {
      user.email = req.body.email;
      const updateUser = await user.save();
      await req.login(updateUser);

      req.flash('success', 'Your email has been changed');
      res.redirect('/account');
    } catch(e) {
      // Notify of duplicate emails
      if(e.errors && e.errors.email && e.errors.email.kind === 'duplicate') {
        req.flash('error', `${req.body.email} is already in use.`);
        res.redirect('/account');
        return;
      } else {
        req.flash('error', 'There was an issue processing your request');
        res.redirect('/account');
        return;
      }
    }
  }
}
