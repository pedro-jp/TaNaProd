import axios from 'axios';
import { GitHubCommit, SendMessage } from '../../types';
import { sendEmail } from '../../utils/Senders';

class SendMessageService {
  constructor(
    public emails?: string[] | undefined,
    public user?:
      | {
          email: string;
          name: string;
          github_username: string;
        }
      | undefined,
    public repo_url?: string | undefined,
    public github_api_token?: string | undefined
  ) {}
  async Execute({ emails, user, repo_url, github_api_token }: SendMessage) {
    if (emails.length === 0 || !user || !repo_url || !github_api_token) {
      return;
    }
    this.emails = emails;
    this.user = user;
    this.repo_url = repo_url;
    this.github_api_token = github_api_token;
    this.GetCommit();

    emails.forEach((email) => {
      sendEmail({
        to: email,
        subject: 'New commit',
        text: `Hello ${user.name}, a new commit was made on the repository ${repo_url}`
      });
    });

    return 'Message sent successfully to ';
  }

  async GetCommit() {
    if (!this.user || !this.repo_url || !this.github_api_token || !this.emails)
      throw new Error('Missing data');

    try {
      const response = await axios.get<GitHubCommit[]>(
        `https://api.github.com/repos/${this.user.github_username}/${this.repo_url}/commits`,
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`
          }
        }
      );
      const commit = response.data[0];
      console.log(commit.author);
    } catch (error) {
      console.log(error);
    }
  }
}

export { SendMessageService };
