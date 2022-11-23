import { Router } from 'express';

// import controllers
import { productsGet } from '../controllers/productsController.js';
// import middleware

import userAuthValidMiddleware from '../middleware/userAuthValidMiddleware.js';
import adminAuthValidMiddleware from '../middleware/adminAuthValidMiddleware.js';

const router = Router();

/// //////////////////////////
// router.use( 'middleware' )
/// //////////////////////////

router.use(userAuthValidMiddleware);

router.get('/products', productsGet);

// router.get('/products/cart', ...)
// router.post('/products/cart', ...)

router.use(adminAuthValidMiddleware);

// router.post('/products', ...)
// router.put('/products', ...)
// router.delete('/products', ...)

export default router;
