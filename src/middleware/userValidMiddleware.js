import bcrypt from 'bcrypt';
import { usersCollection } from '../database/db.js';
import loginSchema from '../schemas/loginSchema.js';
import registrationSchema from '../schemas/registrationSchema.js';

export async function signInValid(req, res, next) {
  console.log('signInValid');
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });
  if (error) {
    res.status(422).send(error.details.map((err) => err.message));
    return;
  }
  try {
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }

    const hash = bcrypt.compareSync(password, user.password);
    if (!hash) {
      return res.status(422).send('Senha incorreta');
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send('Não foi possível validar seu pedido');
  }
  next();
}

export async function signUpValid(req, res, next) {
  const { name, email, password } = req.body;

  const { error } = registrationSchema.validate({ name, email, password });
  if (error) {
    return res.status(422).send(error.details.map((err) => err.message));
  }

  const userExist = await usersCollection.findOne({ email });
  if (userExist) {
    return res.status(409).send('Usuário já cadastrado');
  }

  res.locals.user = { name, email, password };
  next();
}
