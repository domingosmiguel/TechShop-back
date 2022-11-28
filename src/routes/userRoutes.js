import { Router } from 'express';
import {
  trolleyItemsDelete,
  trolleyItemsGet,
  trolleyItemsPost,
} from '../controllers/productsController.js';
import { getUser } from '../controllers/userController.js';
import userAuthValidMiddleware from '../middleware/userAuthValidMiddleware.js';

// import controllers

// import middleware

const router = Router();

/// //////////////////////////
// router.use( 'middleware' )
/// //////////////////////////

router.get('/user', getUser);

router.use(userAuthValidMiddleware);

router.get('/cart', trolleyItemsGet);
router.post('/cart', trolleyItemsPost);
router.delete('/cart', trolleyItemsDelete);

export default router;
