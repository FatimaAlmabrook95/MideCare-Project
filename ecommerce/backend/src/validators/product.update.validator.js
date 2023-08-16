const Joi = require('joi')
  const product = Joi.object({
    name: Joi.string(),
    price: Joi.number(),
    image: Joi.string(),
    description: Joi.string(),
    quantity:Joi.number(),
    user:Joi.string(),
    category:Joi.string(),
}).or('name', 'price','image','description','quantity','category')
module.exports = product