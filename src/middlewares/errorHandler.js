import httpStatus from 'http-status';
import ApiError from 'utils/ApiError';
import config from 'config';
import { logger } from 'utils/logger';

const { ENV } = config;

const errorConverter = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    if (statusCode === undefined) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    const response = {
        code: statusCode,
        message,
        ...(config !== 'production' && { stack: err.stack }),
    };

    if (ENV !== 'production') {
        logger.error(err);
    }

    res.status(statusCode).send(response);
};
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */
const notFound = (req, res, next) => {
    const error = new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND]);
    error.statusCode = 404;

    return errorHandler(error, req, res);
};
/* eslint-enable no-unused-vars */

export { errorConverter, errorHandler, notFound };
