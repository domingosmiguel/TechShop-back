import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { collectionsName, databaseName } from '../assets/consts.js';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
try {
  await mongoClient.connect();
  console.log('MongoDB connected!');
} catch {
  console.log(error);
}

const db = mongoClient.db(`${databaseName}`);
console.log(`Connect on ${databaseName} database`)

export const usersCollection = db.collection(collectionsName.users);
export const sessionsCollection = db.collection(collectionsName.sessions);
export const productsCollection = db.collection(collectionsName.products);
export const cartsCollection = db.collection(collectionsName.carts);
export const checkoutsCollection = db.collection(collectionsName.checkouts);
