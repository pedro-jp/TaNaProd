import { SendMessageService } from '../../Services/SendMessageService';
import { SendMessage } from '../../types';
import { date } from '../../utils/data';
import { Request, Response } from 'express';

class SendMessageController {
  async Handle(req: Request, res: Response) {
    const { emails, github_api_token, repo_url, user } =
      req.body as SendMessage;

    const data = {
      emails,
      user,
      repo_url,
      github_api_token
    };

    const sendMessageService = new SendMessageService();
    const message = await sendMessageService.Execute(data);
    res.json(`${message} -  ${date}`);
  }
}

export { SendMessageController };
