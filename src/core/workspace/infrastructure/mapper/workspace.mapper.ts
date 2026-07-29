import { Workspace } from '../../domain/model/workspace.model';

import { Workspace as PrismaWorkspace } from '@prisma/client';
import { WorkspaceResponseDto } from '../../dto/workspace-response.dto';

export class WorkspaceMapper {
  static toDomain(dto: PrismaWorkspace): Workspace {
    return Workspace.restore({ ...dto });
  }

  static toResponse(
    workspace: Workspace,
    imageUrl?: string | null,
  ): WorkspaceResponseDto {
    return {
      id: workspace.id,
      name: workspace.name,
      imageUrl: imageUrl ?? workspace.imageUrl,
      description: workspace.description,
      customUrl: workspace.customUrl,
    };
  }

  static toPersistence(workspace: Workspace) {
    return {
      id: workspace.id,
      name: workspace.name,
      description: workspace.description,
      imageUrl: workspace.imageUrl,
      customUrl: workspace.customUrl,
      createdAt: workspace.createdAt,
      updatedAt: workspace.updatedAt,
    };
  }
}
