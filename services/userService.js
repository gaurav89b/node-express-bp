const UserRepo = require('../repositories').user;

let obj = {};

obj.list = function() {
    return UserRepo.list();
};
module.exports = obj;