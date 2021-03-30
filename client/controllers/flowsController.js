 const mongoose = require('mongoose');
 const Tag = mongoose.model('Tag');
 const User = mongoose.model('User');
 const Report = mongoose.model('Report');
 const Station = mongoose.model('Station');
 const Snowpack = mongoose.model('Snowpack');
 const Reservoir = mongoose.model('Reservoir');
 const axios = require('axios');

 //route unregistered user to custom page
 exports.loadStationDashboard = async (req,res) => {
   let stationNumber = req.params.station;
   let cfs = await Station.findOne({stationNumber});
   const hashtags = await Tag.find({}, {'_id': 0, 'tag': 1});
   const usernames = await User.find({}, {'_id':1, 'name':1, 'photo': 1});

   if (cfs) {
     let snotel = await Snowpack.find({huc: cfs.huc});
     let reservoir = await Reservoir.find({huc: cfs.huc});

     res.render('stationPage', {cfs, snotel, reservoir, user: req.user, usernames, hashtags: hashtags.map(t => t.tag)});
   } else {
     res.render('error');
   }
 }

 exports.checkThenLoad = (req, res) => {
   res.render('homepage');
 }

 exports.loadMap = async (req,res) => {
   res.render('stationExplorer');

 }

 exports.pushValue = async (req,res, next) => {
   //inform non users to create accounts
   if(!req.user){
     req.flash('info', 'You must be logged in to make a list');
     res.redirect('back');
     return;
   } else {
     await User.update( {email: req.user.email}, { $push: {stations: req.params.id} } );
     var added = await Station.findOne( {stationNumber: req.params.id} );

     if (added) {
       var message = added.name;

       req.flash('success', `<span class="--loaded">Successfully added <a href="/site/${req.params.id}">${message}</a> to your list</span>`);
       res.redirect('/list');
     }
   }
 }

 exports.findUserStations = async (req, res, next) => {
   //if they're not a user, return them
   if(!req.user){
     req.flash('info', '<a href="/login">Log in</a> or <a href="signup">register</a> to make lists');
     res.redirect('back');
     return;
   }

   if (!req.user.stations.length){
     req.flash('info', 'No stations found for this account, use the explorer to find and add stations ↓');
     res.redirect('/explorer');
     return;
   }

   res.render('stationList');
 }

//fetch the station data from usgs
exports.requestUserStations = async (req, res) => {
  //if they don't have any stations on their user account...
  if(!req.params.stations){
    req.flash('info', 'No stations found for this account, use the explorer to find and add stations ↓');
    res.redirect('/explorer');
  }

  const cfs = await Station.find({stationNumber: {$in: req.params.stations}});

  // res.render('stationList', {title: 'Station List', cfs, snotel, reservoir});
  res.render('stationList', {cfs});

 }
