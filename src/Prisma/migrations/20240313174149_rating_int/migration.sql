/*
  Warnings:

  - You are about to alter the column `rating` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Game_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("authorId", "genre", "id", "name", "rating") SELECT "authorId", "genre", "id", "name", "rating" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_name_key" ON "Game"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
