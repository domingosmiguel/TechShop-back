import Joi from 'joi';

const loginSchema = Joi.object({
  name: Joi.string().min(3).max(60).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),

  password: Joi.string().min(6).max(30).required(),

  repeatPassword: Joi.ref('password').required(),
});

export default loginSchema;
