import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { Workspace } from '../../domain/model/workspace.model';
import { IWorkspaceRepository } from '../../domain/types/workspace.repository.interface';
import { WorkspaceMapper } from '../mapper/workspace.mapper';

@Injectable()
export class WorkspaceRepository implements IWorkspaceRepository {
  constructor(private readonly db: PrismaService) {}

  async findAllUserWorkspaces(
    userId: string,
    name?: string,
  ): Promise<Workspace[]> {
    const workspaces = await this.db.workspace.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    return workspaces.map((workspace) => WorkspaceMapper.toDomain(workspace));
  }

  async findByName(name: string, memberId: string): Promise<Workspace> {
    const team = await this.db.workspace.findFirstOrThrow({
      where: {
        name: name,
        members: {
          some: {
            userId: memberId,
          },
        },
      },
    });

    return WorkspaceMapper.toDomain(team);
  }

  async create(workspace: Workspace, memberId: string): Promise<Workspace> {
    const data = WorkspaceMapper.toPersistence(workspace);

    const created = await this.db.workspace.create({
      data: {
        ...data,
        members: {
          create: {
            userId: memberId,
            role: 'Admin',
          },
        },
      },
    });

    return WorkspaceMapper.toDomain(created);
  }

  async update(workspace: Workspace): Promise<Workspace> {
    const data = WorkspaceMapper.toPersistence(workspace);

    const updated = await this.db.workspace.update({
      where: {
        id: workspace.id,
      },
      data,
    });

    return WorkspaceMapper.toDomain(updated);
  }

  async delete(workspaceId: string, memberId: string): Promise<void> {
    await this.db.workspace.delete({
      where: {
        id: workspaceId,
        members: {
          some: {
            userId: memberId,
          },
        },
      },
    });
  }
}
