/**
 * User specific routes method goes here.
 * 
 */

// 1) validate request
// 2) call service function
// 3) send respone

// Display list of all Genre.
const UserModel = require('../models').User;
const Joi = require('joi');
//const UserRepo = require('../repositories').user;
const UserService = require('../services').user;
const {prepareResponse} = require('../utilities/responseParserUtility');

let User = {};
/*User.list = function(req, res) {
    UserModel.findAll().then(users => {
        // projects will be an array of all Project instances
        res.status(200).send(users)
    })
    //res.send('NOT IMPLEMENTED: Genre list');
};*/

User.list = async function(req, res) {
    const user = await UserService.list();
    let obj = {
        status:1,
        message:2,
        data:user
    };
    prepareResponse(res, obj);
    //res.status(200).send(user);
};

User.detail = function(req, res) {
    return UserModel.findAll({
        where: { id: 1 } 
    })
    .then(user => res.json(user))
    res.send('NOT IMPLEMENTED: Genre detail index key value');
};

User.post = function(req, res) {
    //console.log(req);
    console.log(req.body.key);
    res.send('NOT IMPLEMENTED: Genre post 1');
};

User.create = function(req, res) {

    // 1) validate request
    // 2) call service function
    // 3) send respone
    // define the validation schema
    const schema = Joi.object().keys({

        // email is required
        // email must be a valid email string
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
    });

    let data = req.body;
    // validate the request data against the schema
    Joi.validate(data, schema, (err, value) => {
        // create a random number as id
        const id = Math.ceil(Math.random() * 9999999);
        if (err) {
            console.log(err);
            // send a 422 error response if validation fails
            return res.status(200).json({
                status: 'error',
                message: 'Invalid request data',
                data: data
            });
        } else {
            console.log(req.body.name);
            /*let userObj = {
                name:"Name",
                email:"Email",
                password:"Password"
            };*/
            return UserModel
            .create(data)
            .then(user => res.status(200).json(user))
            .catch();
        }
    });

    
    //res.send('NOT IMPLEMENTED: Genre post 1');
};

module.exports = User;