import { Project as PrismaProject } from '@prisma/client';
import { Project } from '../../domain/model/project.model';

export class ProjectMapper {
  static toDomain(project: PrismaProject, isFavorite = false) {
    return Project.restore({
      id: project.id,
      name: project.name,
      description: project.description,
      workspaceId: project.workspaceId,
      color: project.color,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      isFavorite,
    });
  }

  static toPersistence(project: Project) {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      color: project.color,
      workspaceId: project.workspaceId,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }
}
