var _ = require('lodash'),
defaults = {};
// LOAD ENV
require('dotenv').config();
// load all variables here and set in custom config. Not use env variable in application

_.set(defaults, "Constants", {
    CONSTANT_NAME_1: "const_val",
    BATCH: 2,
    DEFAULT_ACTION: null
});

function __getEnvConfig() {
    switch (process.env.NODE_ENV) {
        /*case 'production':
            return require('./lib/prod');
        case 'test':
            return require('./lib/test');*/
        default:
            return require('./lib/dev');
    }
}

// set all variables which are fetched from env variable here.
config = {
    jwtPrivateKeyCustom: process.env.jwtPrivateKeyCustom,
    debug:process.env.DB_HOST,
    DB_HOST: process.env.DB_HOST,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    BASE_URL: process.env.BASE_URL,
    SWAGGER_BASE_URL: process.env.SWAGGER_BASE_URL,
};
exports = module.exports = _.defaultsDeep(config, __getEnvConfig(), defaults);