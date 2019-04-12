/**
 * User specific routes method goes here.
 * 
 */

// 1) validate request
// 2) call service function
// 3) send respone
// 4) in case of catch (promise) use next(error) i.e pass this to next middleware (last middle ware is error middlware in express)
// 5) wrap main logic in try catch block and in catch use point 4 approach and return [no need as we have used express-async-errors module]

// Display list of all Genre.
const UserModel = require('../models').User;
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const config = require('config');
const customConfig = require('../config');

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

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           //$ref: '#/definitions/users'
 */


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

/**
 * @swagger
 * /users/create:
 *   post:
 *     tags:
 *       - users
 *     description: Create Merchant
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: "#/parameters/header-device-id"
 *       - $ref: "#/parameters/header-device-type"
 *       - name: body
 *         in: body
 *         description: status
 *         required: true
 *         schema:
 *          type: object
 *          required:
 *           - Order
 *          properties:
 *           email:
 *            type: string
 *            enum: [0, 1]
 *            default: "user@domain.com"
 *           password:
 *            type: string
 *            example: "123444"
 *           name:
 *            type: string
 *            example: "user"
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           //$ref: '#/definitions/users'
 */

User.create = async function(req, res, next) {

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
    const isValid = Joi.validate(data, schema);
    console.log(isValid);
    if (isValid.error) {
        let obj = {
            status:0,
            message:"error",
            data:isValid.error,
            statusCode:401
        };
        prepareResponse(res, obj);
        return
    }
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    var createUser = UserService.create(data);
    createUser
        .then((user) => {
            let obj = {
                status:1,
                message:"success",
                data:user
            };
            prepareResponse(res, obj)
        })
        //.catch();
        .catch((error) => {
            next(error);
        });
};

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - users
 *     description: Login
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: token
 *         in: header
 *         description: token to be passed as a header
 *         required: true
 *         type: string
 *       - in: query
 *         name: page
 *         schema:
 *         type: integer
 *         required: false
 *         description: pageno
 *       - name: body
 *         in: body
 *         description: status
 *         required: true
 *         schema:
 *          type: object
 *          required:
 *           - Order
 *          properties:
 *           email:
 *            type: string
 *            enum: [0, 1]
 *            default: "a@borrows.com"
 *           password:
 *            type: string
 *            example: "123444"
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           //$ref: '#/definitions/users'
 */
User.login = async function(req, res) {
    console.log(req.body);
    let obj = {
        data:req.body
    }
    let email = req.body.email;
    let password = req.body.password;
    let user =  await UserModel.findOne({
        where: { email: email },
        order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['id', 'DESC'],
        ]
    });
    if (!user) {
        obj.data.error = "no email found";
        prepareResponse(res, obj)
        return;
    }
    console.log(user);
    console.log(password);
    console.log(user.password);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        obj.data.error = "Not valid password";
    } else {
        let token = jwt.sign({id:user.id, name:user.name, email: user.email}, customConfig.jwtPrivateKeyCustom);
        obj.data.error = "valid password";
        obj.data.token = token;
    }
    prepareResponse(res, obj)
}

module.exports = User;