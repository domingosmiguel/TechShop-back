import { usersCollection } from "../database/db.js";
import loginSchema from "../schemas/loginSchema.js";

export async function signIn (req, res) {
    const { email, password } = req.body;

    const { error } = loginSchema.validate({ email, password });

    if (error) {
        res.status(422).send(error.details.map(err => err.message));
        return;
    }

    const user = await usersCollection.find().toArray();

    res.send({ email, password, error });
}