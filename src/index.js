import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import authRoutes from './routes/authRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

server.use(authRoutes);
server.use(productsRoutes);
server.use(userRoutes);
server.use(checkoutRoutes);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
