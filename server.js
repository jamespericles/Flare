// Requiring dotenv for serer variable replacement
require("dotenv").config();
// Requiring necessary npm packages
const express = require("express");
const bodyParser = require('body-parser'); //TWILIO
const pino = require('express-pino-logger')(); //TWILIO
const cron = require('node-cron'); //TWILIO

// //const favicon = require('serve-favicon');
// //const path = require('path');

const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

// Requiring passport as we've configured it
const passport = require("passport");
// Requiring our routes
const routes = require("./routes");

// Creating express app and configuring middleware needed for authentication
const app = express();
// //app.use(favicon(path.join(__dirname, 'client', 'public', 'favicon.ico')));
// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); //TWILIO
app.use(bodyParser.json()); //TWILIO
app.use(pino); //TWILIO

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Creating mySQL db connection for user session

if (process.env.JAWSDB_URL) {
  let connection = mysql.createConnection(
    {
      URL: process.env.JAWSDB_URL,
    host: process.env.JAWSDB_HOST,
    port: process.env.JAWSDB_PORT,
    user: process.env.JAWSDB_USER,
    password: process.env.JAWSDB_PASSWORD,
    database: process.env.JAWSDB_DATABASE,
})
} else {
  let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
});
// Setting up session variable expiration
const sessionStore = new MySQLStore(
  {
    checkExpirationInterval: parseInt(process.env.DB_CHECK_EXP_INTERVAL, 10),
    expiration: parseInt(process.env.DB_EXPIRATION, 10),
  },
  connection
);
// Create a cookie that expires in 1 day
const expireDate = new Date();
expireDate.setDate(expireDate.getDate() + 1);
// Using sessions to keep track of our user's login status
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.DB_SECRET,
    store: sessionStore,
    cookie: { expires: expireDate },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// using our routes required at the outset of server dependencies
app.use(routes);
const db = require("./models");

db.sequelize.sync(
  // {force: true}
  ).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});

// TWILIO
// set credentials in the environment 
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  /* NEEDED WITHIN THE CRON JOB - then not needed, .catch to log errors */
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
  /* NEEDED END */
});

app.post('/api/plans/:id/start', (req, res) => {
  /* STEPS
    1) Make DB request for plan and join with template / group / contact
    2) Start cron job with plan time as we the time to run
    3) Within cron run client.messages with each contact and the template message
  */

  // CRON EXAMPLE - */15 equals at 15 minutes
    // const task = cron.schedule('0 */15 * * * *', () => {
        // Loop through contactts and send messages here
        // task.destroy();
    // })

    // Task may need to be a global variable so you can destroy it within another endpoint
  //

  /* NEEDED WITHIN THE CRON JOB - then not needed, .catch to log errors */
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
  /* NEEDED END */
});
