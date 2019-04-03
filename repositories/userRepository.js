const UserModel = require('../models').User;

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
                resolve(user)
            })
    });
    //.catch();
}

module.exports = obj;