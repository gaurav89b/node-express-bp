exports.responseHandler = function (req, res, next) {
    let data = res.locals.data;
    let status = res.locals.status;
    //res.status(status).json(data);
    next();
};