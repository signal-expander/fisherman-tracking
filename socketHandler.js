const AppError = require('./utils/appError');

exports.addGpsPoints = async (payload, next) => {
    try {

        console.log("payload -> ", payload);
        

        next();

    } catch (err) {
        return next(new AppError(404, 'fail', err));
    }


}