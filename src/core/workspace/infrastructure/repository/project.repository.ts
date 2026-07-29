import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { Project } from '../../domain/model/project.model';
import { IProjectRepository } from '../../domain/types/project.repository.interface';
import { ProjectMapper } from '../mapper/project.mapper';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(private readonly db: PrismaService) {}

  async findAll(workspaceId: string, userId: string): Promise<Project[]> {
    const userProjects = await this.db.project.findMany({
      where: { workspaceId },
      include: {
        favoriteUsers: {
          where: { userId },
          select: { id: true },
        },
      },
    });

    return userProjects.map((project) => {
      const isFavorite = project.favoriteUsers.length > 0;
      return ProjectMapper.toDomain(project, isFavorite);
    });
  }

  async create(project: Project) {
    const data = ProjectMapper.toPersistence(project);

    const created = await this.db.project.create({ data });

    return ProjectMapper.toDomain(created);
  }

  async update(projectId: string, project: Partial<Project>) {
    const data = ProjectMapper.toPersistence(project as Project);

    const updated = await this.db.project.updateManyAndReturn({
      where: { id: projectId },
      data,
    });

    if (updated.length === 0) {
      return null;
    }

    return ProjectMapper.toDomain(updated[0]);
  }

  async delete(projectId: string) {
    await this.db.project.deleteMany({
      where: { id: projectId },
    });
  }

  async addToFavorites(projectId: string, userId: string) {
    const existingFavorite = await this.db.userFavoriteProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });

    if (existingFavorite) {
      await this.db.userFavoriteProject.delete({
        where: { id: existingFavorite.id },
      });

      return;
    }

    await this.db.userFavoriteProject.create({
      data: {
        userId,
        projectId,
      },
    });
  }
}
