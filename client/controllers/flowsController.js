 const mongoose = require('mongoose');
 const Tag = mongoose.model('Tag');
 const User = mongoose.model('User');
 const River = mongoose.model('River');
 const Report = mongoose.model('Report');
 const Station = mongoose.model('Station');
 const Snowpack = mongoose.model('Snowpack');
 const Reservoir = mongoose.model('Reservoir');
 const axios = require('axios');
 const mail = require('../handlers/mail');

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

 exports.loadRiverPage = async (req, res) => {
   let snowpacks;
   let reservoirs;
   const river = await River.findOne({gnisId: req.params.river});
   const stations = await Station.find({gnisId: req.params.river});
   const usernames = await User.find({}, {'_id':1, 'name':1, 'photo': 1});
   const reports = await Report.find({gnisId: req.params.river, isPrivate: false});
   const promises = await reports.map(async report => {
     const user = await User.findOne({_id: mongoose.Types.ObjectId(report.authorId)}, {photo: 1});
     report.photo = user.photo;

     return report;
   })

   const reportsEnhanced = await Promise.all(promises)
   // TODO: add resevoirs, snowpacks, campgrounds, boat launches, POIs, and rapids


   if (river) {
     if (stations.length) {
       snowpacks = await Snowpack.find({'huc': stations[0].huc});
       reservoirs = await Reservoir.find({'huc': stations[0].huc});
     }

     res.render('riverPage', {river, stations, reports: reportsEnhanced, snowpacks, reservoirs, user: req.user})
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
     }
   }
 }

 exports.addStationToList = async (req,res, next) => {
   //inform non users to create accounts
   if(!req.user){
     req.flash('info', 'You must be logged in to save or track stations');
     res.redirect('/login');
     return;
   } else {
     await User.update( {email: req.user.email}, { $push: {stations: req.params.id} } );
     var added = await Station.findOne( {stationNumber: req.params.id} );

     if (added) {
       var message = added.name;
       req.flash('success', `<span class="--loaded">Successfully added <a href="/site/${req.params.id}">${message}</a> to your list</span>`);
     }
   }
 }

 exports.flagStation = async (req,res, next) => {
   //inform non users to create accounts
   if(!req.user){
     return;
   } else {
     const station = await Station.findOne( {stationNumber: req.params.id} );
     await station.update( {stationNumber: req.params.id}, { $set: {flagged: true} } );
     const flagged = await Station.findOne( {stationNumber: req.params.id} );
     mail.send({
       toEmail: 'checktheflowsabuse@gmail.com',
       subject: 'Station Flagged',
       filename: 'qa-request',
       station: flagged.name,
       stationNumber: flagged.stationNumber,
     });
     return;

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
     req.flash('info', 'Use the search bar in the top left to find rivers of interest.');
     return;
   }

   res.render('stationList');
 }

//fetch the station data from usgs
exports.requestUserStations = async (req, res) => {
  //if they don't have any stations on their user account...
  if(!req.params.stations){
    req.flash('info', 'Use the search bar in the top left to find rivers of interest.');
  }

  const cfs = await Station.find({stationNumber: {$in: req.params.stations}});

  // res.render('stationList', {title: 'Station List', cfs, snotel, reservoir});
  res.render('stationList', {cfs});

 }
