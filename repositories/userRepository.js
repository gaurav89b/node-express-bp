const UserModel = require('../models').User;

let obj = {};

obj.list = function(req, res) {
    return UserModel.findAll();
    /*UserModel.findAll().then(users => {
        // projects will be an array of all Project instances
        console.log(users);
        return users;
    })*/
    //res.send('NOT IMPLEMENTED: Genre list');
};
module.exports = obj;