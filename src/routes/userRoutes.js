import { Router } from 'express';
import { trolleyItems } from '../controllers/productsController.js';
import { getUser } from '../controllers/userController.js';

// import controllers

// import middleware

const router = Router();

/// //////////////////////////
// router.use( 'middleware' )
/// //////////////////////////

router.get('/user', getUser)
router.get('/cart', trolleyItems)

export default router;
