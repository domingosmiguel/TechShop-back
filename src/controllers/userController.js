import { sessionsCollection, usersCollection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signIn (req, res) {
    const { email } = req.body;
    const token = uuid();

    try {
        const user = await usersCollection.findOne({ email });
        await sessionsCollection.insertOne({ userID: user._id, token });
        return res.status(201).send({ token, name: user.name });
    } catch (err) {
        return res.status(500).send('Não foi poosível fazer login')
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

export async function getUser (req, res) {
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '')

    const userID = await sessionsCollection.findOne({ token })
    const user = await usersCollection.findOne({ _id: new Object(userID.userID) })
    res.send({ name: user.name, email: user.email })
}