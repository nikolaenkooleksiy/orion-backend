/*
  Warnings:

  - You are about to drop the column `boardId` on the `tags` table. All the data in the column will be lost.
  - Added the required column `workspaceId` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_boardId_fkey";

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "boardId",
ADD COLUMN     "workspaceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
