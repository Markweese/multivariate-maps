 const mongoose = require('mongoose');
 const User = mongoose.model('User');
 const Station = mongoose.model('Station');
 const Snowpack = mongoose.model('Snowpack');
 const Reservoir = mongoose.model('Reservoir');
 const axios = require('axios');

 //route unregistered user to custom page
 exports.loadStationDashboard = async (req,res) => {
   let stationNumber = req.params.station;
   let cfs = await Station.findOne({stationNumber});
   let snotel = await Snowpack.find({huc: cfs.huc});
   let reservoir = await Reservoir.find({huc: cfs.huc});

   res.render('stationPage', {cfs, snotel, reservoir});
 }

 exports.checkThenLoad = (req, res) => {

   if(req.user){
     res.redirect('/list');
   } else {
     res.redirect('/explorer');
   }

 }

 exports.loadMap = async (req,res) => {
   let stationsFull;
   let stations = [];

   stationsFull = await Station.find({});
   res.render('stationExplorer', { stationsFull });

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
     req.flash('info', '<a href="/login">LOG IN</a> or <a href="signup">REGISTER</a> to make lists');
     res.redirect('back');
     return;
   }

   if (!req.user.stations.length){
     req.flash('info', 'No stations found for this account, use the explorer to find and add stations ↓');
     res.redirect('/explorer');
     return;
   }
   //fetch stations from user model
   const user = await User.findOne( {_id: req.user._id} );
   const stations = user.stations;

   req.params.stations = stations;
   next();
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
