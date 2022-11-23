import { Router } from 'express';

// import controllers

// import middleware
import userAuthValidMiddleware from '../middleware/userAuthValidMiddleware.js';

const router = Router();

/// //////////////////////////
// router.use( 'middleware' )
/// //////////////////////////

router.use(userAuthValidMiddleware);

// router.post('/checkout', ...)

export default router;
