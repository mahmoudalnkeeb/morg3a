import { Router } from 'express';
import * as authController from './controller';
import { authenticate } from '@/middlewares/authentication';

const authModule = Router();

authModule.post('/student/send-otp', authController.sendStudentOTP);
authModule.post('/student/verify-otp', authController.verifyStudentOTP);
authModule.post('/staff/login', authController.staffLogin);

// @require-auth
authModule.post('/refresh-token', authenticate, authController.refreshToken);

// @require-auth
// NOTE: need some work in terms of authorization
authModule.post('/logout', authenticate, authController.logout);

export default authModule;
