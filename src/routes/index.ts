import { Router } from 'express';
import { SendMessageController } from '../controllers/SendMessageController';

const router = Router();
const sendMessageController = new SendMessageController();

router.post('/api', sendMessageController.Handle.bind(sendMessageController));

export { router };
