const { AppError } = require("../utils/AppError");

exports.globalError = (error, req, res, next) => {
    error.message = error.message || "Something went wrong";
    error.statusCode = error.statusCode || 500;

    console.log(error);
    if (process.env.NODE_ENV === "development") {
        handleDevelopmentError(error, req, res);
    } else if (process.env.NODE_ENV === "production") {
        if (error.name === "CastError") error = handleCastError(error);
        if (error.code === 11000) error = handleDuplicateFieldsError(error);
        handleProductionError(error, req, res);
    }
};

const handleDevelopmentError = (error, req, res) => {
    return res.status(error.statusCode).json({
        message: error.message,
        stack: error.stack,
        error,
    });
};

const handleProductionError = (error, req, res) => {
    return res.status(error.statusCode).json({
        message: error.message,
    });
};

//handling invalid database field input
const handleCastError = (error) => {
    const message = `${error.value} is not a valid ${error.path}`;
    return new AppError(message, 422);
};

const handleDuplicateFieldsError = (error) => {
    const value = error.message.match(/(["'])(\\?.)*?\1/)[0];
    const message = `${value} already exists. Please use another value!`;
    return new AppError(message, 409);
};
