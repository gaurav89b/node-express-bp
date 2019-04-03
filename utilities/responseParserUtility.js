// Response will be send from here.
function prepareResponse(res, resMeta) {

    let status = resMeta.status;
    let message = resMeta.message;
    let data = resMeta.data;
    res.send({
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