import { ObjectId } from 'mongodb';
import { cartsCollection, productsCollection } from '../database/db.js';

export const productsGet = async (req, res) => {
  // ADD SOME FILTERS
  try {
    const products = await productsCollection.find().toArray();
    res.status(200).send(products);
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
  const {
    product: { name, description, price, category, picture, qty },
  } = res.locals;
  try {
    const { modifiedCount } = await productsCollection.updateOne(
      {
        _id: ObjectId(id),
      },
      { $set: { name, description, price, category, picture, qty } }
    );
    if (modifiedCount === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
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
export const trolleyItemsGet = async (req, res) => {
  const {
    session: { userID },
  } = res.locals;
  try {
    const itemsList = await cartsCollection.find({ userID }).toArray();
    res.send(itemsList);
  } catch {
    res.sendStatus(500);
  }
};
export const trolleyItemsPost = async (req, res) => {
  const { product } = req.body;
  delete product.qty;
  const {
    session: { userID },
  } = res.locals;
  try {
    const { modifiedCount } = await cartsCollection.updateOne(
      {
        userID,
        product,
      },
      {
        $inc: { qty: 1 },
      }
    );
    if (modifiedCount === 0) {
      await cartsCollection.insertOne({
        userID,
        product,
        qty: 1,
      });
    }
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
};
export const trolleyItemsDelete = async (req, res) => {
  const { product } = req.body;
  delete product.qty;
  const {
    session: { userID },
  } = res.locals;
  console.log(
    '🚀 ~ file: productsController.js ~ line 105 ~ trolleyItemsDelete ~ userID',
    userID
  );
  try {
    await cartsCollection.deleteOne({
      userID,
      product,
    });
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
};
