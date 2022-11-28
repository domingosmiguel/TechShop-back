import productSchema from '../schemas/productSchema.js';

export default function productValidMiddleware(req, res, next) {
  console.log('productValidMiddleware');
  const { body } = req;

  const { name, description, price, category, picture, qty } = body;

  const validation = productSchema.validate(
    { name, description, price, category, picture, qty },
    { abortEarly: false }
  );
  if (validation.error) {
    const erros = validation.error.details.map((detail) => detail.message);
    return res.status(400).send(erros);
  }

  res.locals.product = { name, description, price, category, picture, qty };
  next();
}
