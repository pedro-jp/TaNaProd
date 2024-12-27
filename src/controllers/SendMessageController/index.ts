import { SendMessageService } from '../../Services/SendMessageService';
import { SendMessage } from '../../types';
import { date } from '../../utils/data';
import { Request, Response } from 'express';

class SendMessageController {
  async Handle(req: Request, res: Response) {
    const { token } = req.body;

    const sendMessageService = new SendMessageService();
    const message = await sendMessageService.Execute(token);
    message;
    res.json(`Serviço online -  ${date}`);
  }
}

export { SendMessageController };
