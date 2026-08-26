import { Workspace } from '../../domain/model/workspace.model';

import { Prisma, Workspace as PrismaWorkspace } from '@prisma/client';

export class WorkspaceMapper {
  static toDomain(dto: PrismaWorkspace): Workspace {
    return Workspace.restore({ ...dto });
  }

  static toPersistence(
    workspace: Workspace,
  ): Prisma.WorkspaceUncheckedCreateInput {
    return {
      id: workspace.id,
      name: workspace.name,
      description: workspace.description,
      imageKey: workspace.imageKey,
      customUrl: workspace.customUrl,
      createdAt: workspace.createdAt,
      updatedAt: workspace.updatedAt,
    };
  }
}
