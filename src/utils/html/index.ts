interface InfoType {
  repo_name: string;
  commit_message: string;
  commit_date: string;
  author_name: string;
  commit_hash: string;
  commit_url: string;
}

export const html = ({
  author_name,
  commit_date,
  repo_name,
  commit_message,
  commit_hash,
  commit_url
}: InfoType) => {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email - Atualização</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: "Manrope", sans-serif;
      background: #121212;
      color: #ffffff;
      display: grid;
      place-content: center;
      height: 100vh;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #1e1e1e;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
    }
    .email-header {
      background-color: #4246ff;
      color: #ffffff;
      text-align: center;
      padding: 20px;
      font-size: 1.5rem;
      font-weight: 700;
    }
    .email-body {
      padding: 20px;
      line-height: 1.6;
      font-size: 1rem;
      color: #e0e0e0;
    }
    .email-body strong {
      color: #ffffff;
    }
    .email-footer {
      background-color: #181818;
      text-align: center;
      padding: 15px;
      font-size: 0.875rem;
      color: #888888;
    }
    .email-footer a {
      color: #4246ff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      ${repo_name} - Atualização em Produção 🚀
    </div>
    <div class="email-body">
      <p>Olá, ${author_name}</p>
      <p><strong>O backend da ${repo_name} foi atualizado em produção com sucesso!</strong> 🎉</p>
      <ul>
        <li><strong>Autor:</strong> ${author_name}</li>
        <li><strong>Data:</strong> ${commit_date}</li>
        <li><strong>Mensagem:</strong> ${commit_message}</li>
        <li><strong>Hash:</strong> ${commit_hash}</li>
        <li><strong>Link:</strong> <a href="${commit_url}">Ver commit</a></li>
      </ul>
    </div>
  </div>
</body>
</html>
`;
};
