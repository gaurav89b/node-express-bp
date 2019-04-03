var _ = require('lodash'),
defaults = {};

_.set(defaults, "Constants", {
    CONSTANT_NAME_1: "const_val",
    BATCH: 1,
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

config = {};
exports = module.exports = _.defaultsDeep(config, __getEnvConfig(), defaults);