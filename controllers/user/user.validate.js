const Joi = require('joi');

const userValidation = (user) => {
    const schema = {
        first_name: Joi.types.String().trim().required(),
        last_name: Joi.types.String().trim().required(),
        username: Joi.types.String().trim().min(6).max(30).required(),
        email: Joi.types.String().email().required(),
        phone_number: Joi.types.String().regex("/^09\d{9}$/").required(),
        password: Joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
    }
    return Joi.validate(user, schema);
}

module.exports = userValidation;