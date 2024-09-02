function errorHandler(err, req, res, next) {
    // // Log the error
    switch (true) {
        case typeof err === 'string':
            // custom application error
            const is404 = err.toLowerCase().endsWith('no encontrado');
            const statusCode = is404 ? 404 : 401;
            return res.status(statusCode).json({ msg: err });
        default:
            return res.status(err.status || 400).json({ msg: err.message || 'Error de aplicación'});
    }
}

module.exports = errorHandler;
