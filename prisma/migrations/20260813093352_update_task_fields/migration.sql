/*
  Warnings:

  - The values [Local,GitHub,Google] on the enum `AuthProvider` will be removed. If these variants are still used in the database, this will fail.
  - The values [Admin,User] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - The values [Admin,Manager,Member] on the enum `WorkspaceRole` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `creator_id` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('1', '2', '3');

-- CreateEnum
CREATE TYPE "TaskApprovalStatus" AS ENUM ('pending', 'approved', 'rejected');

-- AlterEnum
BEGIN;
CREATE TYPE "AuthProvider_new" AS ENUM ('local', 'github', 'google');
ALTER TABLE "public"."users" ALTER COLUMN "provider" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "provider" TYPE "AuthProvider_new" USING ("provider"::text::"AuthProvider_new");
ALTER TYPE "AuthProvider" RENAME TO "AuthProvider_old";
ALTER TYPE "AuthProvider_new" RENAME TO "AuthProvider";
DROP TYPE "public"."AuthProvider_old";
ALTER TABLE "users" ALTER COLUMN "provider" SET DEFAULT 'local';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('admin', 'user');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WorkspaceRole_new" AS ENUM ('admin', 'manager', 'member');
ALTER TABLE "public"."workspace_members" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "workspace_members" ALTER COLUMN "role" TYPE "WorkspaceRole_new" USING ("role"::text::"WorkspaceRole_new");
ALTER TYPE "WorkspaceRole" RENAME TO "WorkspaceRole_old";
ALTER TYPE "WorkspaceRole_new" RENAME TO "WorkspaceRole";
DROP TYPE "public"."WorkspaceRole_old";
ALTER TABLE "workspace_members" ALTER COLUMN "role" SET DEFAULT 'member';
COMMIT;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "approval_status" "TaskApprovalStatus" NOT NULL DEFAULT 'pending',
ADD COLUMN     "assignee_id" TEXT,
ADD COLUMN     "creator_id" TEXT NOT NULL,
ADD COLUMN     "due_date" TIMESTAMP(3),
ADD COLUMN     "priority" "TaskPriority" NOT NULL DEFAULT '1';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user',
ALTER COLUMN "provider" SET DEFAULT 'local';

-- AlterTable
ALTER TABLE "workspace_members" ALTER COLUMN "role" SET DEFAULT 'member';

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
