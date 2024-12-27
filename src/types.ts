export interface SendMessage {
  emails: string[];
  github_api_token: string;
  repo_url: string;
  user: string;
}

interface UserType {
  github_username: string;
}

export interface CommitType {
  sha: string;
  commit: {
    committer: {
      date: string;
    };
    message: string;
  };
  committer: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
}
