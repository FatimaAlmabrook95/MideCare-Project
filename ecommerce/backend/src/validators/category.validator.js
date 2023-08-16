const Joi = require('joi')
  const category = Joi.object({
    name: Joi.string().required(),
    madeIn: Joi.string().required(),
    image: Joi.string().required(),
})
module.exports = category