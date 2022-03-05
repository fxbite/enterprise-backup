const Joi = require('@hapi/joi')

// Register Validation
const registerValidation = (data)=> {
    const schema = {
        username: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        fullname: Joi.string()
            .min(6)
            .required()
    }

    return Joi.validate(data, schema)
}

const loginValidation = (data)=> {
    const schema = {
        username: Joi.string()
            .min(6)
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    }

    return Joi.validate(data, schema)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation