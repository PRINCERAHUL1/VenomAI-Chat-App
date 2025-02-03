import {Router} from 'express';
import * as userController from '../controllers/user.controller.js';
import {body} from 'express-validator';
import * as authMiddleware from '../middleware/auth.middleware.js';


const router = Router();

router.post('/register',
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password').isLength({ min: 4}).withMessage('Password must be at least 4 characters'),
    userController.CreateUserController);

router.post('/login',
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password').isLength({ min: 4}).withMessage('Password must be at least 4 characters'),
    userController.loginController);

router.get('/profile', authMiddleware.authUser, userController.profileController);

router.get('/logout', authMiddleware.authUser, userController.logoutController);

router.get('/all', authMiddleware.authUser, userController.getAllUsersController);


export default router;