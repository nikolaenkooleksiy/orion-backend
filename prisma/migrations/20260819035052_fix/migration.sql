/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `workspaces` table. All the data in the column will be lost.
  - Added the required column `imageKey` to the `workspaces` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workspaces" DROP COLUMN "imageUrl",
ADD COLUMN     "imageKey" TEXT NOT NULL;
