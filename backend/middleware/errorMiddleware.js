const errorHandler = (err, req, res, next) => {
    // below: how does this function know 'res' if we're just calling this function with throw new Error, and not passing anything into it?
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message, // I guess this is whatever's in throw new Error('...')
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = { errorHandler }