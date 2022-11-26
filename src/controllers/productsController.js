import { ObjectId } from 'mongodb';
import { productsCollection, sessionsCollection } from '../database/db.js';

export const productsGet = async (req, res) => {
  // ADD SOME FILTERS
  try {
    const products = productsCollection.find();
    res.send(products);
  } catch {
    res.sendStatus(500);
  }
};

export const productsPost = async (req, res) => {
  const { product } = res.locals;
  try {
    const { insertedId } = await productsCollection.insertOne(product);
    if (insertedId) {
      res.send(insertedId);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

export const productsPut = async (req, res) => {
  const { id } = req.params;
  const { product } = res.locals;
  try {
    const { modifiedCount } = await productsCollection.updateOne(
      {
        _id: ObjectId(id),
      },
      { $set: { product } }
    );
    if (modifiedCount === 0) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const productsDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const { deleteCount } = await productsCollection.deleteOne({
      _id: ObjectId(id),
    });
    if (deleteCount === 0) {
      return res.sendStatus(404);
    }
    return res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const trolleyItems = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');

  const userID = await sessionsCollection.findOne({ token });
  const itemList = await productsCollection.find().toArray();

  const userList = itemList.filter(item => item.userID === userID.userID);
  res.send(userList)
};