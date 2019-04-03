const jwt = require('jsonwebtoken');
const {prepareResponse} = require('../utilities/responseParserUtility');

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
        const decoded = jwt.verify(token, 'jwtPrivateKey');
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