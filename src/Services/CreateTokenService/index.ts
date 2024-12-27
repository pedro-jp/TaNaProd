import { SendMessage } from '../../types';
import { PrismaClient } from '@prisma/client';
interface User extends SendMessage {}
class CreateTokenService {
  async execute({ emails, user, repo_url, github_api_token }: User) {
    if (!emails || !user || !repo_url) {
      return;
    }

    const prisma = new PrismaClient();

    const api_token = [...Array(60)]
      .map(() => Math.random().toString(36)[2])
      .join('');
    try {
      await prisma.user.create({
        data: {
          emails: emails.toString(),
          github_api_token: github_api_token,
          repo_name: repo_url,
          user: user,
          api_token
        }
      });

      return api_token;
    } catch (error) {
      console.error(error);
    }
  }
}

export { CreateTokenService };
