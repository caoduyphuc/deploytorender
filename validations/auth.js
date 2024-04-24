const Joi = require('joi')

const registerVadilator = (data) => {
    const rule = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().pattern(RegExp('^[a-zA-Z0-9]{6,20}$')).required()
    })
    return rule.validate(data)
}

module.exports.registerVadilator = registerVadilator;