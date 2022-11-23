import { productsCollection } from '../database/db.js';

export const productsGet = async (req, res) => {
  // ADD SOME FILTERS
  try {
    const products = productsCollection.find();
    res.send(products);
  } catch {
    res.sendStatus(500);
  }
};
