export interface SendMessage {
  emails: string[];
  github_api_token: string;
  repo_url: string;
  user: UserType;
}

interface UserType {
  email: string;
  name: string;
  github_username: string;
}

export interface GitHubCommit {
  sha: string;
  node_id: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  author: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
}
