import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export const PERMISSIONS = [
  ['workspace:read', 'workspace', 'View workspace'],
  ['workspace:update', 'workspace', 'Edit workspace settings'],
  ['workspace:delete', 'workspace', 'Delete workspace'],
  ['workspace:manage_members', 'workspace', 'Invite/remove members'],
  ['workspace:manage_roles', 'workspace', 'Create/edit roles and assign them'],

  ['project:create', 'project', 'Create projects'],
  ['project:read', 'project', 'View projects'],
  ['project:update', 'project', 'Edit projects'],
  ['project:delete', 'project', 'Delete projects'],

  ['board:create', 'board', 'Create boards'],
  ['board:read', 'board', 'View boards'],
  ['board:update', 'board', 'Edit boards'],
  ['board:delete', 'board', 'Delete boards'],

  ['task:create', 'task', 'Create tasks'],
  ['task:read', 'task', 'View tasks'],
  ['task:update', 'task', 'Edit tasks'],
  ['task:delete', 'task', 'Delete tasks'],
  ['task:assign', 'task', 'Assign tasks'],
  ['task:approve', 'task', 'Approve/reject tasks'],
] as const;

async function main() {
  for (const [code, category, description] of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { code },
      update: { category, description },
      create: { code, category, description },
    });
  }

  console.log(`Seeded ${PERMISSIONS.length} permissions`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
