const ResponseMessage = require("./ResponseMessage");

class Response {

    /**
     * response success
     * @param {any} res 
     * @param {json} data 
     * @param {string} message 
     */
    static success(res, data, message) {
        let responseData = {};
        responseData.status = ResponseMessage.Success.Status;
        responseData.message = ResponseMessage.Success.Message;
        responseData.data = data;
        res.status(ResponseMessage.Success.Code);
        res.json(responseData);
    }

    /**
     * response not found
     * @param {any} res 
     * @param {string} message 
     */
    static notFound(res, message) {
        let responseData = {};
        responseData.status = ResponseMessage.NotFound.Status;
        responseData.message = ResponseMessage.NotFound.Message;
        responseData.data = {};
        res.status(ResponseMessage.NotFound.Code);
        res.json(responseData);
    }
}

module.exports = Response;