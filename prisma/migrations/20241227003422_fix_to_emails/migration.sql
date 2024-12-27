/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - Added the required column `emails` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "emails" TEXT NOT NULL,
    "github_api_token" TEXT NOT NULL,
    "repo_name" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "api_token" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("api_token", "github_api_token", "id", "repo_name", "user") SELECT "api_token", "github_api_token", "id", "repo_name", "user" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_api_token_key" ON "User"("api_token");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
