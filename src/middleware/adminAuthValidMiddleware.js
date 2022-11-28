import { usersCollection } from '../database/db.js';

export default async function adminAuthValidMiddleware(req, res, next) {
  console.log('adminAuthValidMiddleware');
  const { session } = res.locals;
  try {
    const user = await usersCollection.findOne({ _id: session.userId });
    if (user?.admin !== true) {
      return res.sendStatus(401);
    }
    res.locals.user = user;
  } catch (error) {
    return res.sendStatus(500);
  }
  next();
}
