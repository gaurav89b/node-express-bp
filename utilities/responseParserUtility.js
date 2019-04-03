// Response will be send from here.
function prepareResponse(res, resMeta) {

    let status = resMeta.status;
    let message = resMeta.message;
    let data = resMeta.data;
    let statusCode = resMeta.statusCode ? resMeta.statusCode : 200;
    res.status(statusCode).json({
        status: status, 
        message: message,
        data: data,
    });
    //return prepareResponse;
    //res.status(status).send(user);
}

module.exports = {
    prepareResponse: prepareResponse
}