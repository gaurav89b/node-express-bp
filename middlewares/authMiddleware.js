const jwt = require('jsonwebtoken');
const {prepareResponse} = require('../utilities/responseParserUtility');
const config = require('config');
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        let obj = {
            message:"Forbidden",
            data:{},
            statusCode:403
        };
        prepareResponse(res, obj)
        return;
    }
    try {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (ex) {
        let obj = {
            message:"Un authorized",
            data:{},
            statusCode:401
        };
        prepareResponse(res, obj)
        return;
    }
}

module.exports = auth;