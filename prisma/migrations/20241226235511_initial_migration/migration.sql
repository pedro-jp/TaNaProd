-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "github_api_token" TEXT NOT NULL,
    "repo_name" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "api_token" TEXT NOT NULL
);
