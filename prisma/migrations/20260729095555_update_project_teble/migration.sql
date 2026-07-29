/*
  Warnings:

  - Added the required column `color` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "color" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "user_favorite_projects" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_favorite_projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_favorite_projects_user_id_idx" ON "user_favorite_projects"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_favorite_projects_user_id_project_id_key" ON "user_favorite_projects"("user_id", "project_id");

-- AddForeignKey
ALTER TABLE "user_favorite_projects" ADD CONSTRAINT "user_favorite_projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_projects" ADD CONSTRAINT "user_favorite_projects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
