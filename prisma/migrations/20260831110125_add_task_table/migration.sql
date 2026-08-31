/*
  Warnings:

  - The `priority` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `approval_status` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `tagId` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('pending', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "tagId" TEXT NOT NULL,
DROP COLUMN "priority",
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "approval_status",
ADD COLUMN     "approval_status" "ApprovalStatus" NOT NULL DEFAULT 'pending';

-- DropEnum
DROP TYPE "TaskApprovalStatus";

-- DropEnum
DROP TYPE "TaskPriority";

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "boardId" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
