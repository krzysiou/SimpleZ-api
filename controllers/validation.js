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

//FILE VALIDATION
const fileValidation = (data) => {
    const schema = Joi.object({
        id: Joi.string(),
        name: Joi.string().min(3).required().max(20),
        date: Joi.string(),
        sumEcts: Joi.string(),
        sumHours: Joi.string(),
        info: Joi.object({
          name: Joi.string().min(3).required().max(20),
          surname: Joi.string().min(3).required().max(20),
          albumNumber: Joi.string().min(6).required().max(6),
          field: Joi.string().min(1).required().max(20),
          email: Joi.string().min(6).required().max(30).email(),
          level: Joi.string().min(1).required().max(20),
          term: Joi.string().min(1).required().max(20),
          year: Joi.string().min(1).required().max(20),
          numberMain: Joi.string().min(1).required().max(20),
          numberSide: Joi.string().min(1).required().max(20),
        }),
        mainSubjects: Joi.array(),
        sideSubjects: Joi.array()
    })
   return schema.validate(data)
}


module.exports = { registerValidation, loginValidation, fileValidation }