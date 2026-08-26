import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { DEFAULT_BOARD_NAME } from '../../domain/constants/board.constants';
import { DEFAULT_LISTS } from '../../domain/constants/list.constants';
import { Project } from '../../domain/model/project.model';
import { IProjectRepository } from '../../domain/types/project.repository.interface';
import { ProjectMapper } from '../mapper/project.mapper';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(private readonly db: PrismaService) {}

  async findAll(workspaceId: string, memberId: string) {
    const userProjects = await this.db.project.findMany({
      where: {
        workspaceId,
        workspace: { members: { some: { userId: memberId } } },
      },
      include: {
        favoriteUsers: {
          where: { userId: memberId },
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

    const createdProject = await this.db.$transaction(async (tx) => {
      return await tx.project.create({
        data: {
          ...data,
          workspaceId: project.workspaceId,
          boards: {
            create: {
              name: DEFAULT_BOARD_NAME,
              lists: {
                createMany: {
                  data: DEFAULT_LISTS,
                },
              },
            },
          },
        },
      });
    });

    return ProjectMapper.toDomain(createdProject, false);
  }

  async findById(workspaceId: string, projectId: string, memberId: string) {
    const project = await this.db.project.findFirstOrThrow({
      where: {
        id: projectId,
        workspaceId: workspaceId,
        workspace: { members: { some: { userId: memberId } } },
      },
    });

    return ProjectMapper.toDomain(project);
  }

  async update(project: Project) {
    const data = ProjectMapper.toPersistence(project);

    const updated = await this.db.project.update({
      where: { id: project.id },
      data,
    });

    return ProjectMapper.toDomain(updated);
  }

  async delete(projectId: string) {
    await this.db.project.deleteMany({
      where: { id: projectId },
    });
  }

  async toggleFavorite(projectId: string, userId: string) {
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
