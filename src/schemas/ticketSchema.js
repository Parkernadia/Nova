const joi = require("joi");

exports.createTicketSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    customerName: joi.string().required(),
    customerEmail: joi.string().email().required(),
});

exports.updateTicketSchema = joi.object({
    status: joi
        .string()
        .valid("on hold", "closed", "open", "resolved")
        .required(),
});

exports.addTicketAgentSchema = joi.object({
    agentId: joi.string().required(),
});
