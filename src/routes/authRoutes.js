import { Router } from 'express';
import { signIn, signUp } from '../controllers/userController.js';
import { signInValid, signUpValid } from '../middleware/userValidMiddleware.js';

// import controllers

// import middleware

const router = Router();

/// //////////////////////////
// router.use( 'middleware' )
/// //////////////////////////

router.post('/sign-up', signUpValid, signUp)
router.post('/sign-in', signInValid, signIn)

export default router;
