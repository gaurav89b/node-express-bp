
const config = require('./index');

// logging true print sql logs in console, default is true
dbObj = {
    development: {
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      host: config.DB_HOST,
      dialect: "mysql",
      //logging: false
    },
    testing: {
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
        database: config.DB_NAME,
        host: config.DB_HOST,
        dialect: "mysql",
        logging: false
    },
    production: {
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
        database: config.DB_NAME,
        host: config.DB_HOST,
        dialect: "mysql",
        logging: false
    }
  }
module.exports = dbObj;  