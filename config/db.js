// DEPENDENCIES
const mongoose = require(`mongoose`);
let gracefulShutdown;

// MONGOOSE 
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/totesnote`;
mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on(`connected`, function logMongooseConnected() {
  console.log(`Mongoose connected to ` + dbURI);
});

mongoose.connection.on(`disconnected`, function logMongooseDisconnected() {
  console.log(`Mongoose disconnected`);
});

mongoose.connection.on(`error`, function logMongooseConnectionError(err) {
  console.log(`Mongoose connection error: ` + err);
});

// APP TERMINATION EVENTS
gracefulShutdown = function gracefulShutdown(msg, callback) {
  mongoose.connection.close(function closeConnection() {
    console.log(`Mongoose disconnected through ` + msg);
    callback();
  });
};

process.once(`SIGUSR2`, function sigUsr2() {
  gracefulShutdown(`nodemon restart`, function nodemonResart() {
    process.kill(process.pid, `SIGUSR2`);
  });
});
process.on(`SIGINT`, function sigInit() {
  gracefulShutdown(`app termination`, function appTermination() {
    process.exit(0);
  });
});
process.on(`SIGTERM`, function sigTerm() {
  gracefulShutdown(`Heroku app termination`, function herokuAppTermination() {
    process.exit(0);
  });
});

// MODELS
require(`../models/user.model`);
require(`../models/note.model`);
require(`../models/noteVersion.model`);
