// DEPENDENCIES //
const express      = require(`express`);
const path         = require(`path`);
const favicon      = require(`serve-favicon`);
const logger       = require(`morgan`);
const cookieParser = require(`cookie-parser`);
const bodyParser   = require(`body-parser`);
const cors         = require(`cors`);
const passport     = require(`passport`);

require(`dotenv`).config()
require(`./config/db`); // Data Model
require(`./config/passport`); // Passport Config

// API Routes
const routesApi = require(`./routes/index`);

// EXPRESS //
const app = express();

// app.use(favicon(__dirname + `/public/logo.png`));
app.use(logger(`dev`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// use it before all route definitions
app.use(cors({origin: 'http://localhost:4200'}));
// Initialise Passport (before using route middleware)
app.use(passport.initialize());

// Use API routes when path starts with /api
app.use(`/api`, routesApi);
// Else, render the index.html page for the Angular SPA
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, `app_client`, `index.html`));
});

// ERROR HANDLERS //
// Forward 404 to Error Handler
app.use(function error404Handler(req, res, next) {
  let err = new Error(`Not Found`);
  err.status = 404;
  next(err);
});

// Auth Error
app.use(function authError(err, req, res, next) {
  if (err.name === `AuthError`) {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// Production Error Handler
if (app.get(`env`) === `production`) {
  app.use(function prodError(err, req, res, next) {
    res.status(err.status || 500);
    res.render(`error`, {
      message: err.message,
      error: err,
    });
  });
}

// SERVER //
const port = process.env.PORT || 8080;
app.listen(port);
console.log(`App listening on port`, port);

module.exports = app;

