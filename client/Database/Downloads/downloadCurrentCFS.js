//get mongo access keys
require('dotenv').config({ path: '.env' });

const axios = require('axios');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

//bring in the stations and user db
const User = require('../../models/User');
const Station = require('../../models/Station');

(async function gatherUserStations() {
  let stations = [];
  const allUserStations = await User.find({}, {'_id':0, 'stationNumber':1, 'stations':1});

  for(const station of allUserStations) {
    if (station.stations) {
      for (const s of station.stations) {
        if (!stations.includes(s)) {
          stations.push(s);
          try {
            updateStation(s);
          } catch(e) {
            console.log(e);
          }
        }
      };
    }
  }
})();

//start looping over stations
async function updateStation(station) {
  //loop over the stations and send a request to usgs for it's data
  if(station.length >= 8) {
    try {
      await axios.get(`https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${station}&siteStatus=active`)
      .then (r => {
        updateData(r.data.value.timeSeries, station);
      });

    } catch(e) {

      //** with rollbar, set a number of times you will run this loop for each station on a fail
      console.log('❌❌❌Error❌❌❌');
      console.log(e);

    }
  }
};

function updateData(data, station){

  const params = [{code: '00060', name: 'cfs'}, {code: '00010', name: 'temp'}, {code: '00095', name: 'conductance'}, {code: '00400', name: 'ph'}];

  data.forEach( r => {

    //for every object in the station record, check if the parameter being measured matches any of the ones were looking for
    params.forEach(param => {
      //if it does, push to the db with it
      if (r.variable.variableCode[0].value == param.code){

        pushDb(r.values[0].value[0].value, r.values[0].value[0].dateTime, param.name, station)
        .catch(e => {
          console.log(e);
        });

      }

    });

  });

}

async function pushDb(reading, date, param, station) {

  //reformat usgs date to compare to mongdb date
  let currentStation = await Station.findOne({stationNumber: station});
  date = new Date(date);

  if(currentStation[param].length != undefined && currentStation[param].length > 0) {
    //if the currentStation already has data check time stamps
    if(date.getTime() !== currentStation[param][currentStation[param].length - 1 ].date.getTime()) {

      try {
        await Station.update( { _id : currentStation._id }, { $push: { [param] : { reading, date } }});

      } catch(e) {
        console.log('❌❌❌Error❌❌❌');
        console.log(e);
      }

    } else {

      return;

    }
  //otherwise, don't check stamp and just add it
  } else {

      try {

        await Station.update( { _id : currentStation._id }, { $push: { [param] : { reading, date } }});

      } catch(e) {
        console.log('❌❌❌Error❌❌❌');
        console.log(e);
      }
  }
}
