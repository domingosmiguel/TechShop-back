import productSchema from '../schemas/productSchema';

export default function productValidMiddleware(req, res, next) {
  const { body } = req;

  const { name, description, price, category, picture, Qty } = body;

  const validation = productSchema.validate(
    { name, description, price, category, picture, Qty },
    { abortEarly: false }
  );
  if (validation.error) {
    const erros = validation.error.details.map((detail) => detail.message);
    return res.send(erros);
  }

  res.locals.product = { name, description, price, category, picture, Qty };
  next();
}
