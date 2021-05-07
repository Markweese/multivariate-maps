const states = require('../data/states');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const FormData = require('form-data');
const crypto = require('crypto');
const promisify = require('es6-promisify');
const fs = require('fs');
const axios = require('axios');
const jimp = require('jimp');
const multer = require('multer');
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next){
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto) {
      next(null, true);
    } else {
      next({message: 'Invalid file type'});
    }
  }
};

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
  req.sanitize('name').blacklist('\[\]\.<>{}\$:\(\);\'"\/@#\s!%\^&\*_-\+=\|"\?~\\`');
  req.sanitize('email').blacklist('<>\{\}\$:\(\);\'\"\/');
  req.checkBody('name', 'You must supply a name').notEmpty();
  req.checkBody('origin', 'Supply A Home State').notEmpty();
  req.checkBody('activity', 'Supply An Activity').notEmpty();
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

exports.uploadProfilePhoto = multer(multerOptions).single('photo');

exports.resizeProfilePhoto = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  } else {
    const photo = await jimp.read(req.file.buffer);
    const width = parseInt(req.body.offsetX) * -1;
    const height = parseInt(req.body.offsetY) * -1;

    if (photo.bitmap.height > photo.bitmap.width) {
        await photo.resize(300, jimp.AUTO);
        await photo.crop(0, height * 3, 300, 300);
    } else if (photo.bitmap.height < photo.bitmap.width) {
        await photo.resize(jimp.AUTO, 300);
        await photo.crop(width * 3, 0, 300, 300);
    } else {
      await photo.resize(300, 300);
    }

    await photo.getBuffer(jimp.AUTO, (err, buffer) => {
      req.file.buffer = buffer;
    })

    next();
  }
};

exports.register = async (req, res) => {
  let photo;

  if (req.file) {
    photo = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      offsetX: req.body.offsetX,
      offsetY: req.body.offsetY
    };
  }

  const sessionToken = crypto.randomBytes(20).toString('hex');
  const user = new User({ email: req.body.email, name: req.body.name, origin: req.body.origin.toLowerCase(), sessionToken, activity: req.body.activity, photo});
  const register = promisify(User.register, User);

  //
  try {
    const newUser = await register(user, req.body['new-password']);
    req.login(newUser);
    next();
  } catch(e) {
    if(e.name === 'UserExistsError'){
      req.flash('error', `${req.body.email} is already in use. Please <a href='/login?user=${req.body.email}'>log in</a> if you already have an account, or <a href='/login?user=${req.body.email}#forgotPassword'>reset your password</a>`);
      res.redirect('back');
      return;
    } else {
      console.log(e);
      req.flash('error', `There was an issue processing your registration`);
      res.redirect('back');
    }
  }
};

exports.postProfilePhoto = async (req, res) => {
  if (req.file && req.file.buffer) {
    const updates = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      offsetX: req.body.offsetX,
      offsetY: req.body.offsetY
    };

    try {
      await User.findOneAndUpdate({_id: req.user._id}, {$set: {photo: updates}});

      req.flash('success', 'Image successfully updated');
      res.redirect('back');
    } catch(e) {
      req.flash('error', 'There was an issue uploading your photo');
      res.redirect('back');
    }
  } else if (req.body.offsetX || req.body.offsetY) {
    await User.findOneAndUpdate({_id: req.user._id}, {$set: {'photo.offsetX': req.body.offsetX, 'photo.offsetY': req.body.offsetY}});

    req.flash('success', 'Image successfully updated');
    res.redirect('back');
  } else {
    req.flash('success', 'Image successfully updated');
    res.redirect('back');
  }
};

exports.account = async (req, res) => {
  const checkusername = await User.find({}, {'_id':0, 'name':1}).then(names => {
    return names.map(username => {
      return username.name;
    });
  });

  if (req.user.photo.data) {
      req.user.photo.data = req.user.photo.data.toString('base64');
  }

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
  req.checkBody('activity', 'Supply An Activity').notEmpty();

  const errors = req.validationErrors();

  // catch validation errors
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.redirect('/account');
    return;
  } else {
    const updates = {
      name: req.body.name,
      origin: req.body.origin,
      activity: req.body.activity
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

exports.cleanNotifications = async (req, res) => {
  try {
    await User.findOneAndUpdate({_id: req.user._id}, {$set: {'notifications.$[].seen' : true}});
    return {status: 200};
  } catch(e) {
    return e;
  }
}

exports.loadUserPage = async (req, res) => {
  const user = await User.findOne({name: req.params.user});
  console.log(user._id)
  console.log(req.user.id)
  if (req.user && req.user._id === user._id) {
    console.log('user')
  } else {
    console.log('not user')
  }
}
