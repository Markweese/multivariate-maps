//get mongo access keys
require('dotenv').config({ path: '.env' });

const axios = require('axios');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

//bring in the stations and user db
const User = require('../../models/User');
const Station = require('../../models/Station');
const Snowpack = require('../../models/Snowpack');

//collectors
let hucs = [];
let stations = [];
let snowpacks = [];

async function gatherUserStations() {
  const allUserStations = await User.find({}, {'_id':0, 'stationNumber':1, 'stations':1});

  for(const station of allUserStations) {
    if (station.stations) {
      for (const s of station.stations) {
        if (!stations.includes(s)) {
          stations.push(s);
        }
      }
    }
  }
}

async function gatherHucs() {
  await gatherUserStations();

  for(let station of stations) {
    let currentStation = await Station.findOne({stationNumber: station}, {'_id':0, 'huc':1});
    let currentHuc = currentStation.huc;

    if (!hucs.includes(currentHuc)) {
      hucs.push(currentHuc);
    }
  }
};

async function gatherSnotel() {
  await gatherHucs();

  for(let huc of hucs) {
    let currentSnowpacks = await Snowpack.find({huc: huc}, {'_id':0,'stationNumber':1, 'state':1});

    currentSnowpacks.forEach(snowpack => {
      let currentState = snowpack.state;
      let currentSnowpack = snowpack.stationNumber;

      if (!snowpacks.includes(currentSnowpack)) {
        snowpacks.push({'id':currentSnowpack,'state':currentState});
      }
    });
  }
}

(async function downloadSnotel() {
  await gatherSnotel();

  for(let snowpack of snowpacks) {
    let url = `https://wcc.sc.egov.usda.gov/reportGenerator/view_csv/customMultiTimeSeriesGroupByStationReport/daily/start_of_period/${snowpack.id}:${snowpack.state}:SNTL%7Cid=%22%22%7Cname/-29,0/WTEQ::value?fitToScreen=false&sortBy=7%3A-1`;

    axios.get(url)
    .then(data => {
      parseResponse(data.data, snowpack);
    })
    .catch((e) => {
      console.log(e);
    });
  }
})()
.catch((e) => {
  console.log(e);
});

function parseResponse(csv, snowpack) {
  let keys = [];
  let first = true;
  let parsedCsv = [];
  let parsedNl = csv.split('\n');

  parsedNl.forEach(line => {
    if(line.charAt(0) !== '#') {
      row = line.split(',');

      if(first === true) {
        keys = row;
        first = false;
      } else {
        let newObj = {};

        keys.forEach((key,index) => {
          key = key.length > 5 ? 'swe' : key;
          newObj[key] = row[index]
        });

        parsedCsv.push(newObj);
      }
    }
  });

  upsertSnotel(parsedCsv, snowpack);
}

async function upsertSnotel(csv, snowpack) {
  for(let row of csv) {
    if(row.swe) {
      let reading = parseFloat(row.swe);
      let date = new Date(row.Date);

      try {
        await Snowpack.update( {stationNumber: snowpack.id}, { $push: {swe: {reading, date}} } );
        console.log(`Upserted: ${snowpack.id}`)
      } catch {
        console.log(`Object Upsert Error: ${snowpack.id}`);
      }

    }
  }
}
