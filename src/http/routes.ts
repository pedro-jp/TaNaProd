import { Router } from 'express';
import { SendMessageController } from '../controllers/SendMessageController';

export const router = Router();

router.post('/api', new SendMessageController().Handle);
