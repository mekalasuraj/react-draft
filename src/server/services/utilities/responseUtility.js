export default (logger) => {

    const getSuccessResponse = function getSuccessResponse(responseData) {
        return {
            status: 'success',
            data: responseData
        };
    };

    const getInvalidResponse = function getInvalidResponse(errors) {
        return {
            status: 'invalid',
            errors: errors
        };
    };

    const getFailureResponse = function getNewFailureResponse(req, errorObj) {
        logger.error({ req }, errorObj);
        return {
            status: 'failure',
            message: 'something went wrong on our end. We are looking into it.'
        };
    };

    return {
        getSuccessResponse,
        getInvalidResponse,
        getFailureResponse
    };
};
