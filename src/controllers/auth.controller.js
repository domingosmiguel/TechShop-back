import { sessionsCollection, usersCollection } from "../database/db.js";
import loginSchema from "../schemas/loginSchema.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signIn (req, res) {
    const { email, password } = req.body;
    const token = uuid();

    const { error } = loginSchema.validate({ email, password });

    if (error) {
        res.status(422).send(error.details.map(err => err.message));
        return;
    }

    const user = await usersCollection.findOne({ email });
    await sessionsCollection.insertOne({ token, userID: user._id });
    res.status(201).send( user._id, token );
}

export async function signUp (req, res) {
    const { name, email, password } = req.body;
    const passHash =  bcrypt.hashSync(password, 10);

    await usersCollection.insertOne({ name, email, passHash });

    res.status(200).send({ name, email, password });
}