//mongodb hookup and env setup
require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);
const Station = require('../../../../models/Station');
const User = require('../../../../models/User');

//library imports
const child_process = require('child_process');
const scriptsFolder = 'Database/Jobs/child-pipelines/python_scripts';

// Global variables
let stations = [];
const allUserStations = User.find({}, {'_id':0, 'stationNumber':1, 'stations':1});

const compileHistoric = async () => {
  let stations = await allUserStations;

  for(const station of stations) {
    if (station.stations) {
      for (const s of station.stations) {
        if (!stations.includes(s)) {
          stations.push(s);
          getStationStats(s);
        }
      };
    }
  }
}

const getStationStats = (station) => {
  /*
  result: aggregates python output
  pythonProcess: the external python process
  */
  var result = ''
  const pythonProcess = child_process.spawn('python', [`${scriptsFolder}/historic_cfs.py`, station]);

  pythonProcess.stdout.on('data', function (data) {
    // aggregate python output
    result += data;
  });

  pythonProcess.stdout.on('end', function (data) {
    try {
    // parse aggregated string output from python
      statistics = JSON.parse(result);
      // push each daily stat into the station model
      try {
        pushStats(statistics, station);
      } catch(e) {
        console.log(e);
      }
    } catch (e) {
      // let us know there was an issue pushing
      console.log("There was an error loading the statistics into MongoDB");
    }
  });

  pythonProcess.stdout.on('close', function (code) {
    console.log(`child process exited with code ${code}`);
  });

  pythonProcess.stderr.on('data', function (data) {
    console.log(`!Error: ${data}`);
  });
};

const pushStats = async (stats, station) => {
  try {
    await Station.findOneAndUpdate({ stationNumber: station }, { $set:{ historicDaily : stats}});
    console.log(`Successfully updated station ${station}`);
  } catch(e) {
    console.lgo(e);
  }
}

compileHistoric();
