import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { Workspace } from '../../domain/model/workspace.model';
import {
  IWorkspaceRepository,
  WorkspaceSearchOptions,
} from '../../domain/types/workspace.repository.interface';
import { WorkspaceMapper } from '../mapper/workspace.mapper';

@Injectable()
export class WorkspaceRepository implements IWorkspaceRepository {
  constructor(private readonly db: PrismaService) {}

  async findAllUserWorkspaces(
    userId: string,
    options?: WorkspaceSearchOptions,
  ) {
    const workspaces = await this.db.workspace.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
        name: {
          contains: options?.name,
          mode: 'insensitive',
        },
      },
    });

    return workspaces.map((workspace) => WorkspaceMapper.toDomain(workspace));
  }

  async findById(workspaceId: string, memberId: string) {
    const team = await this.db.workspace.findFirstOrThrow({
      where: {
        id: workspaceId,
        members: {
          some: {
            userId: memberId,
          },
        },
      },
    });

    return WorkspaceMapper.toDomain(team);
  }

  async create(ownerId: string, workspace: Workspace) {
    const data = WorkspaceMapper.toPersistence(workspace);

    const created = await this.db.workspace.create({
      data: {
        ...data,
        members: {
          create: {
            userId: ownerId,
            role: 'ADMIN',
          },
        },
      },
    });

    return WorkspaceMapper.toDomain(created);
  }

  async update(workspace: Workspace) {
    const data = WorkspaceMapper.toPersistence(workspace);

    const updatedWorkspace = await this.db.workspace.update({
      where: { id: workspace.id },
      data,
    });

    return WorkspaceMapper.toDomain(updatedWorkspace);
  }

  async delete(workspaceId: string, memberId: string) {
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
