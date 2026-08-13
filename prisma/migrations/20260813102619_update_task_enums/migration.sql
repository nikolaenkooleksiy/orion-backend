/*
  Warnings:

  - The values [pending,approved,rejected] on the enum `TaskApprovalStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskApprovalStatus_new" AS ENUM ('Pending', 'Approved', 'Rejected');
ALTER TABLE "public"."Task" ALTER COLUMN "approval_status" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "approval_status" TYPE "TaskApprovalStatus_new" USING ("approval_status"::text::"TaskApprovalStatus_new");
ALTER TYPE "TaskApprovalStatus" RENAME TO "TaskApprovalStatus_old";
ALTER TYPE "TaskApprovalStatus_new" RENAME TO "TaskApprovalStatus";
DROP TYPE "public"."TaskApprovalStatus_old";
ALTER TABLE "Task" ALTER COLUMN "approval_status" SET DEFAULT 'Pending';
COMMIT;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "approval_status" SET DEFAULT 'Pending';
