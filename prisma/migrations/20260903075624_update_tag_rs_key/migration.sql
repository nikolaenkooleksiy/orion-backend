/*
  Warnings:

  - You are about to drop the column `tagId` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `taskId` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_tagId_fkey";

-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "taskId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "tagId";

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
