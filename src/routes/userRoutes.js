import { Router } from 'express';
import { getUser } from '../controllers/userController.js';

// import controllers

// import middleware

const router = Router();

/// //////////////////////////
// router.use( 'middleware' )
/// //////////////////////////

router.get('/user', getUser)

export default router;
