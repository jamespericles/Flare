// Requiring dotenv for serer variable replacement
require("dotenv").config();

// Requiring necessary npm packages
const express = require("express");

const bodyParser = require("body-parser"); //TWILIO
const pino = require("express-pino-logger")(); //TWILIO

const favicon = require("serve-favicon");
const path = require("path");

const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

// Requiring passport as we've configured it
const passport = require("passport");

// Requiring our routes
const routes = require("./routes");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(favicon(path.join(__dirname, "client", "public", "favicon.ico")));

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); //TWILIO
app.use(bodyParser.json()); //TWILIO
app.use(pino); //TWILIO

let connection;

// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
});
// }

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

db.sequelize
  .sync({
    // force: true
  })
  .then(function () {
    app.listen(PORT, function () {
      console.log("App listening on PORT " + PORT);
    });
  });
