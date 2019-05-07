const UserRepo = require('../repositories').user;

let obj = {};

obj.list = function() {
    return UserRepo.list();
};
obj.create = function (data) {
    return new Promise(function (resolve, reject) {
        UserRepo
            .create(data)
            .then(user => {
                resolve(user);
            }).catch(err => {
                reject(err);
            });
    });

}
module.exports = obj;