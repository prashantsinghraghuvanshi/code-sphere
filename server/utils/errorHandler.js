const constant=require('./constant');

class CustomError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}

class ErrorHandler{
    static sendError(res, err){
        const statusCode=err.statusCode || 500;
        const errorMessage=err.message || constant.INTERNAL_SERVER_ERROR;

        res.status(statusCode).json({success: false, error: errorMessage});
    }

    static createError(
        message=constant.INTERNAL_SERVER_ERROR,
        statusCode=500
    ) {
        return new CustomError(message, statusCode);
    }
}

module.exports={CustomError, ErrorHandler};