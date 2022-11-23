import Joi from 'joi';

const productSchema = Joi.object({
  name: Joi.string().min(3).max(60).required(),

  description: Joi.string().min(3).max(300).required(),

  price: Joi.number().precision(2).required(),

  category: Joi.string()
    .pattern(/^cellphones|computers|peripherals$/)
    .required(),

  picture: Joi.string().uri().required(),

  Qty: Joi.number().integer().positive().required(),
});

export default productSchema;
