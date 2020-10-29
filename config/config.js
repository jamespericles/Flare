require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "flare",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "flare",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
  production: {
    // eslint-disable-next-line camelcase
    // use_env_variable: "JAWSDB_URL",
    use_env_variable: process.env.JAWSDB_URL,
    dialect: "mysql",
    username: process.env.JAWSDB_USER,
    password: process.env.JAWSDB_PASSWORD,
    database: process.env.JAWSDB_DATABASE,
    host: process.env.PORT,
  },
};
