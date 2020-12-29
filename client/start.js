const mongoose = require('mongoose');

// connect mongodb
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`error connecting to mongodb in start.js`);
  console.log(err);
});

//import all models
require('./models/User');
require('./models/Station');
require('./models/Snowpack');
require('./models/Reservoir');

// Start the app
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
