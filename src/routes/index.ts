import { Router } from 'express';
import { SendMessageController } from '../controllers/SendMessageController';
import { CreateTokenController } from '../controllers/CreateTokenController';
import { create } from 'axios';

const router = Router();

router.post('/api', new SendMessageController().Handle);
router.post('/token', new CreateTokenController().Handle);

export { router };
