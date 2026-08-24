import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Project } from '../domain/model/project.model';
import {
  type IProjectRepository,
  PROJECT_REPOSITORY,
} from '../domain/types/project.repository.interface';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async findAll(workpaceId: string, memberId: string) {
    return await this.projectRepository.findAll(workpaceId, memberId);
  }

  async create(body: CreateProjectDto) {
    const project = Project.create({ ...body });

    return await this.projectRepository.create(project);
  }

  async update(projectId: string, project: UpdateProjectDto) {
    const updated = await this.projectRepository.update(projectId, project);

    if (!updated) {
      throw new NotFoundException('Project not found');
    }
  }

  async delete(projectId: string, userId: string) {
    await this.projectRepository.delete(projectId, userId);

    return {
      isSuccessful: true,
    };
  }

  async addToFavorites(projectId: string, userId: string) {
    return await this.projectRepository.addToFavorites(projectId, userId);
  }
}
