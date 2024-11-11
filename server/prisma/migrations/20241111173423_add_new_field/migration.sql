-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JobPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_JobPost" ("companyName", "description", "id", "title", "type") SELECT "companyName", "description", "id", "title", "type" FROM "JobPost";
DROP TABLE "JobPost";
ALTER TABLE "new_JobPost" RENAME TO "JobPost";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
