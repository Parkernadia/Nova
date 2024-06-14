const joi = require("joi");

exports.loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});

exports.registerAgentSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
});
