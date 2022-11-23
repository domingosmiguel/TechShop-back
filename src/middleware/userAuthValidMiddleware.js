import { sessionsCollection } from '../database/db.js';

export default async function userAuthValidMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const session = await sessionsCollection.findOne({ token });
    if (!session) {
      return res.sendStatus(401);
    }
    res.locals.session = session;
  } catch (error) {
    return res.sendStatus(500);
  }
  next();
}
