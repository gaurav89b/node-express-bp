var _ = require('lodash');
var config = {}

_.set(config, "db.main", {
    host: '',
    user: '',
    password: '',
    database: 'mydb_staging'
});

exports = module.exports = config;
