import axios from 'axios';
import { CommitType, SendMessage } from '../../types';
import { sendEmail } from '../../utils/Senders';
import { html } from '../../utils/html';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class SendMessageService {
  constructor(
    public emails?: string[] | undefined,
    public user?: string | undefined,
    public repo_url?: string | undefined,
    public github_api_token?: string | undefined,
    public commit?: CommitType | undefined
  ) {}
  async Execute(token: string) {
    const reponse = await prisma.user.findUnique({
      where: {
        api_token: token
      }
    });

    const emails = Array(reponse?.emails).filter(
      (email): email is string => email !== undefined
    );
    const user = reponse?.user;
    const repo_url = reponse?.repo_name;
    const github_api_token = reponse?.github_api_token;
    if (!emails || !user || !repo_url) {
      return;
    }
    console.log(emails, user, repo_url, github_api_token);
    this.emails = emails;
    this.user = user;
    this.repo_url = repo_url;
    this.github_api_token = github_api_token;

    await this.GetCommit();
  }

  async GetCommit() {
    if (!this.user || !this.repo_url || !this.emails)
      throw new Error('Missing data');

    try {
      const response = await axios.get(
        `https://api.github.com/repos/${this.user}/${this.repo_url}/commits`,
        {
          headers: {
            Authorization: `token ${
              this.github_api_token !== ''
                ? this.github_api_token
                : process.env.GITHUB_TOKEN
            }`
          }
        }
      );

      this.commit = response.data[0] as CommitType;

      const author_name = this.commit.committer.login;
      const repo_name = this.commit.html_url.split('/')[4];
      const commit_date = this.commit.commit.committer.date;
      const commit_message = this.commit?.commit.message;
      const commit_hash = this.commit?.sha;
      const commit_url = this.commit.html_url;

      const body = html({
        repo_name,
        author_name,
        commit_date: new Date(commit_date).toLocaleDateString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }),
        commit_message,
        commit_hash,
        commit_url
      });

      this.emails.forEach((email) => {
        sendEmail({
          to: email,
          subject: 'New commit',
          text: `New commit on ${this.repo_url}`,
          html: body
        });
        console.log(`Email sent to ${email}`);
      });
    } catch (error) {
      console.log('Github error', error);
    }
  }
}

export { SendMessageService };
