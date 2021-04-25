import * as R from 'ramda';
import httpStatus from 'http-status';
import Joi from 'joi';
import ApiError from 'utils/ApiError';

const validator = (schema) => (req, res, next) => {
    const validSchema = R.pick(['params', 'query', 'body'], schema);
    const object = R.pick(R.keys(validSchema), req);
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object);

    if (error !== undefined) {
        const errorMessage = R.pipe(R.prop('details'), R.map(R.prop('message')), R.join(','))(error);
        next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    Object.assign(req, value);
    next();
};

export default validator;
