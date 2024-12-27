import { CreateTokenService } from '../../Services/CreateTokenService';
import { SendMessage } from '../../types';
import { Request, Response } from 'express';

class CreateTokenController {
  async Handle(req: Request, res: Response) {
    const { emails, github_api_token, repo_url, user } =
      req.body as SendMessage;

    const data = {
      emails,
      user,
      repo_url,
      github_api_token
    };
    const createTokenService = new CreateTokenService();
    const token = await createTokenService.execute(data);
    console.log(token);
    res.json(token);
  }
}

export { CreateTokenController };
