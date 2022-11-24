import { sessionsCollection, usersCollection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signIn (req, res) {
    const { userID } = res.locals.user;
    const token = uuid();

    try {
        await sessionsCollection.insertOne({ userID, token });
        res.status(201).send({ token });
    } catch (err) {
        res.status(500).send('Não foi poosível fazer login')
    }
}

export async function signUp (req, res) {
    const { name, email, password } = res.locals.user;
    const passHash =  bcrypt.hashSync(password, 10);

    try {
        await usersCollection.insertOne({ name, email, passHash });
        res.status(200).send('Cadastro concluido com sucesso');
    } catch (err) {
        res.status(500).send('Não foi possivel realizar o cadastro')
    }
}