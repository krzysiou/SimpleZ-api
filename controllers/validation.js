const { required } = require('joi')
const Joi = require('joi')

//REGISTER VALIDATION
const registerValidation = (data) => {
    const schema = Joi.object({
        id: Joi.string(),
        name: Joi.string().min(6).required().max(20),
        email: Joi.string().min(6).required().max(30).email(),
        password: Joi.string().min(6).required().max(30)
    })
   return schema.validate(data)
} 

//LOGIN VALIDATION
const loginValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required().max(20),
        password: Joi.string().min(6).required().max(30),
    })
   return schema.validate(data)
}

module.exports = { registerValidation, loginValidation }