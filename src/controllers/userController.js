import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { v4 as uuid } from 'uuid';
import { sessionsCollection, usersCollection } from '../database/db.js';

export async function signIn(req, res) {
  const { email } = req.body;
  const token = uuid();
  try {
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }
    await sessionsCollection.deleteOne({ userID: user._id });
    await sessionsCollection.insertOne({ userID: user._id, token });
    return res.status(201).send({ token, name: user.name });
  } catch (err) {
    return res.status(500).send('Não foi possível fazer login');
  }
}

export async function signUp(req, res) {
  const { name, email, password } = res.locals.user;
  const passHash = bcrypt.hashSync(password, 10);

  try {
    const emailAlreadyRegistered = await usersCollection.findOne({ email });
    if (emailAlreadyRegistered) {
      return res.status(409).send('Email já cadastrado no banco de dados');
    }
    await usersCollection.insertOne({ name, email, passHash });
    return res.status(200).send('Cadastro concluído com sucesso');
  } catch (err) {
    return res.status(500).send('Não foi possível realizar o cadastro');
  }
}

export async function getUser(req, res) {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');

  const userID = await sessionsCollection.findOne({ token });
  const user = await usersCollection.findOne({
    _id: new ObjectId(userID.userID),
  });
  return res.send({ name: user.name, email: user.email });
}
