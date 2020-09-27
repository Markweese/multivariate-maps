//get mongo access keys
require('dotenv').config({ path: '.env' });

const axios = require('axios');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

//bring in the stations db
const Station = require('../../models/Station');

//delete those bitches
(async function deleteStations() {
  await Station.remove();
  console.log('💨 💨  Aaaand It\'s Gone💨 💨 ');
  process.exit();
})();
