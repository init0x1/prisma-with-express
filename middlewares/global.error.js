const globalErrorHandler = (err, req, res, next) => {

    console.error('Error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    const errors = err.errors || [];

    res.status(statusCode).json({
        statusCode,
        message,
        errors,
    });
};

module.exports = globalErrorHandler;