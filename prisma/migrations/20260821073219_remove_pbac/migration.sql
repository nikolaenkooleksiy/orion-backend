/*
  Warnings:

  - You are about to drop the column `role_id` on the `workspace_members` table. All the data in the column will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workspace_role_permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workspace_roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "WorkspaceRole" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "workspace_members" DROP CONSTRAINT "workspace_members_role_id_fkey";

-- DropForeignKey
ALTER TABLE "workspace_role_permissions" DROP CONSTRAINT "workspace_role_permissions_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "workspace_role_permissions" DROP CONSTRAINT "workspace_role_permissions_workspaceRoleId_fkey";

-- AlterTable
ALTER TABLE "workspace_members" DROP COLUMN "role_id",
ADD COLUMN     "role" "WorkspaceRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "permissions";

-- DropTable
DROP TABLE "workspace_role_permissions";

-- DropTable
DROP TABLE "workspace_roles";
