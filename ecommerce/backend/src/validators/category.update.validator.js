const Joi = require('joi')
  const category = Joi.object({
    name: Joi.string(),
    madeIn: Joi.string(),
    image: Joi.string(),
}).or('name', 'madeIn','image')
module.exports = category