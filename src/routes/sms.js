import express from 'express';
import { sendOTP } from '../controllers/auth';

const router = express.Router();

router.post('/send-sms', sendOTP);

module.exports = router;
