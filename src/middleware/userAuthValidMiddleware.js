import { sessionsCollection } from '../database/db.js';

export default async function userAuthValidMiddleware(req, res, next) {
  console.log('userAuthValidMiddleware');
  const { authorization } = req.headers;
  console.log(req.headers, req.body);
  if (!authorization) {
    return res.sendStatus(401);
  }
  const token = authorization?.replace('Bearer ', '');
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
