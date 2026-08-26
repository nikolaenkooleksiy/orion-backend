/*
  Warnings:

  - The values [local] on the enum `AuthProvider` will be removed. If these variants are still used in the database, this will fail.
  - The values [Pending,Approved,Rejected] on the enum `TaskApprovalStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [admin,manager,member] on the enum `WorkspaceRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AuthProvider_new" AS ENUM ('credentials', 'github', 'google');
ALTER TABLE "public"."users" ALTER COLUMN "provider" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "provider" TYPE "AuthProvider_new" USING ("provider"::text::"AuthProvider_new");
ALTER TYPE "AuthProvider" RENAME TO "AuthProvider_old";
ALTER TYPE "AuthProvider_new" RENAME TO "AuthProvider";
DROP TYPE "public"."AuthProvider_old";
ALTER TABLE "users" ALTER COLUMN "provider" SET DEFAULT 'credentials';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TaskApprovalStatus_new" AS ENUM ('pending', 'approved', 'rejected');
ALTER TABLE "public"."Task" ALTER COLUMN "approval_status" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "approval_status" TYPE "TaskApprovalStatus_new" USING ("approval_status"::text::"TaskApprovalStatus_new");
ALTER TYPE "TaskApprovalStatus" RENAME TO "TaskApprovalStatus_old";
ALTER TYPE "TaskApprovalStatus_new" RENAME TO "TaskApprovalStatus";
DROP TYPE "public"."TaskApprovalStatus_old";
ALTER TABLE "Task" ALTER COLUMN "approval_status" SET DEFAULT 'pending';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WorkspaceRole_new" AS ENUM ('ADMIN', 'MEMBER');
ALTER TABLE "public"."workspace_members" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "workspace_members" ALTER COLUMN "role" TYPE "WorkspaceRole_new" USING ("role"::text::"WorkspaceRole_new");
ALTER TYPE "WorkspaceRole" RENAME TO "WorkspaceRole_old";
ALTER TYPE "WorkspaceRole_new" RENAME TO "WorkspaceRole";
DROP TYPE "public"."WorkspaceRole_old";
ALTER TABLE "workspace_members" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
COMMIT;

-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "approval_status" SET DEFAULT 'pending',
ALTER COLUMN "priority" SET DEFAULT '3';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
DROP COLUMN "username",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT,
ALTER COLUMN "provider" SET DEFAULT 'credentials',
ALTER COLUMN "providerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "workspace_members" ALTER COLUMN "role" SET DEFAULT 'MEMBER';

-- DropEnum
DROP TYPE "UserRole";

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");
