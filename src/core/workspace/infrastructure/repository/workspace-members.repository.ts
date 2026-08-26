import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { type IWorkspaceMembersRepository } from '../../domain/types/workspace-members.repository.interface';
import { WorkspaceMembersMapper } from '../mapper/workspace-members.mapper';

@Injectable()
export class WorkspaceMembersRepository implements IWorkspaceMembersRepository {
  constructor(private readonly db: PrismaService) {}

  async findAll(workspaceId: string, memberId: string) {
    const isMember = await this.db.workspaceMembers.findFirst({
      where: { workspaceId, userId: memberId },
    });

    if (!isMember) {
      throw new ForbiddenException('You do not have access to this workspace');
    }

    const members = await this.db.workspaceMembers.findMany({
      where: { workspaceId },
      select: {
        id: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return members.map((m) => WorkspaceMembersMapper.toDomain(m));
  }
}
