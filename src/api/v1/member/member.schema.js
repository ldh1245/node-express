import Joi from 'joi';

const getMembers = {
    query: {
        page: Joi.number().min(1).required(),
        limit: Joi.number().min(1).max(20).required(),
    },
};

export { getMembers };
