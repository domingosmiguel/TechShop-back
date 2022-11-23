import { Router } from 'express';
import { signIn } from '../controllers/auth.controller.js';

// import controllers

// import middleware

const router = Router();

/// //////////////////////////
// router.use( 'middleware' )
/// //////////////////////////

// router.post('/sign-up', ...)
router.post('/sign-in', signIn)

export default router;
