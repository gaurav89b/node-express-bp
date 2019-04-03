const UserModel = require('../models').User;
const _ = require('lodash');
let obj = {};

obj.list = function() {
    //try {
        return UserModel.findAll();
    //}
    
    /*UserModel.findAll().then(users => {
        // projects will be an array of all Project instances
        console.log(users);
        return users;
    })*/
    //res.send('NOT IMPLEMENTED: Genre list');
};

obj.create = function(data) {
    return new Promise(function (resolve, reject) {
        UserModel.create(data)
            .then((user) => {
                user = _.pick(user, ['id', 'name', 'email'])
                resolve(user)
            })
    });
    //.catch();
}

module.exports = obj;