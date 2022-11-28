import { Router } from 'express';

// import controllers
import {
  productsDelete,
  productsGet,
  productsPost,
  productsPut,
} from '../controllers/productsController.js';
// import middleware

import adminAuthValidMiddleware from '../middleware/adminAuthValidMiddleware.js';
import productValidMiddleware from '../middleware/productValidMiddleware.js';
import userAuthValidMiddleware from '../middleware/userAuthValidMiddleware.js';

const router = Router();

router.get('/products', productsGet);

router.delete(
  '/products/:id',
  userAuthValidMiddleware,
  adminAuthValidMiddleware,
  productsDelete
);
router.post(
  '/products',
  userAuthValidMiddleware,
  adminAuthValidMiddleware,
  productValidMiddleware,
  productsPost
);
router.put(
  '/products/:id',
  userAuthValidMiddleware,
  adminAuthValidMiddleware,
  productValidMiddleware,
  productsPut
);

export default router;
