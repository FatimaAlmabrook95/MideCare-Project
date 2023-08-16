const Joi = require('joi')
  const product = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    quantity:Joi.number().required(),
    user:Joi.string().required(),
    category:Joi.string().required(),
})
module.exports = product