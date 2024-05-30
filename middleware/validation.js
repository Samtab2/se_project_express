const { Joi, celebrate } = require('celebrate');
const validator = require('validator');


const validateURL = (value, helpers) => {
    if (validator.isURL(value)) {
      return value;
    }
    return helpers.error('string.uri');
  }    







  module.exports.validateCardBody = celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
  
      imageUrl: Joi.string().required().custom(validateURL).messages({
        "string.empty": 'The "imageUrl" field must be filled in',
        "string.uri": 'the "imageUrl" field must be a valid url',
      }),
    }),
  });


  module.exports.validateId = celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
      ItemId: Joi.string().required().hex().length(24),
    }),
  });