import { Router } from 'express';

// import controllers
import {
  productsDelete,
  productsGet,
  productsPost,
  productsPut
} from '../controllers/productsController.js';
// import middleware

import adminAuthValidMiddleware from '../middleware/adminAuthValidMiddleware.js';
import productValidMiddleware from '../middleware/productValidMiddleware.js';
import userAuthValidMiddleware from '../middleware/userAuthValidMiddleware.js';

const router = Router();

router.use(userAuthValidMiddleware);

router.get('/products', productsGet);

// router.get('/products/cart', ...)
// router.post('/products/cart', ...)

router.use(adminAuthValidMiddleware);

router.delete('/products/:id', productsDelete);

router.use(productValidMiddleware);

router.post('/products', productsPost);
router.put('/products/:id', productsPut);

export default router;
