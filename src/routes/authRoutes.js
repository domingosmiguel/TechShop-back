import { Router } from 'express';
import { signIn, signUp } from '../controllers/auth.controller.js';

// import controllers

// import middleware

const router = Router();

/// //////////////////////////
// router.use( 'middleware' )
/// //////////////////////////

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)

export default router;
