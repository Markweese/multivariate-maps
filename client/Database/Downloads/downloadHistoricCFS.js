//mongodb hookup and env setup
require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);
const User = require('../../models/User');

//library imports
let stations = [];
const fs = require('fs');
const axios = require('axios');
const moment = require('moment');

// perform the analysis an update on every station
(async function iterate() {
  const allUserStations = await User.find({}, {'_id':0, 'stationNumber':1, 'stations':1});

  for(const station of allUserStations) {
    if (station.stations) {
      station.stations.forEach(station => {
        if (!stations.includes(station)) {
          stations.push(station);
          getStationData(station);
        }
      });
    }
  }
})();

function getStationData(station) {
  const today = moment(new Date()).format('YYYY-MM-DD');
  const url = `https://waterdata.usgs.gov/nwis/dv?referred_module=sw&search_site_no=${station}&search_site_no_match_type=exact&site_tp_cd=ST&index_pmcode_00060=1&group_key=NONE&sitefile_output_format=html_table&column_name=agency_cd&column_name=site_no&column_name=station_nm&range_selection=date_range&begin_date=1838-01-01&end_date=${today}&format=rdb&date_format=YYYY-MM-DD&rdb_compression=value&list_of_search_criteria=search_site_no%2Csite_tp_cd%2Crealtime_parameter_selection`
  axios.get(url)
  .then(rawData => {
    fs.writeFile(`data/historic/cfs/${station}_historic_cfs.csv`, rawData.data, (e) => {
      if (e) {
        console.log(e);
      }
    });
  })
  .catch(e => {
    console.log(`Error on ${station}: ${e}`);
  });
}
