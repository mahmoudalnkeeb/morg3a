import { Router } from 'express';

const authModule = Router();

authModule.post('/student/send-otp' /* controller */);
authModule.post('/student/verify-otp' /* controller */);
authModule.post('/staff/login' /* controller */);
authModule.post('/refresh-token' /* controller */);
authModule.post('/logout' /* controller */);

export default authModule;
