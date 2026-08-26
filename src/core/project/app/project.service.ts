import { Inject, Injectable } from '@nestjs/common';

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
    return await this.projectRepository.findAll(
      workpaceId,

      memberId,
    );
  }

  async findById(workspaceId: string, projectId: string, memberId: string) {
    return await this.projectRepository.findById(
      workspaceId,
      projectId,
      memberId,
    );
  }

  async create(body: CreateProjectDto) {
    const project = Project.create({ ...body });

    return await this.projectRepository.create(project);
  }

  async update(
    workspaceId: string,
    projectId: string,
    memberId: string,
    body: UpdateProjectDto,
  ) {
    const project = await this.projectRepository.findById(
      workspaceId,
      projectId,
      memberId,
    );

    if (body.name !== undefined) project.rename(body.name);
    if (body.description !== undefined)
      project.changeDescription(body.description);
    if (body.color !== undefined) project.changeColor(body.color);

    return this.projectRepository.update(project);
  }

  async delete(projectId: string, userId: string) {
    await this.projectRepository.delete(projectId, userId);

    return {
      isSuccessful: true,
    };
  }

  async toggleFavorite(projectId: string, userId: string) {
    return await this.projectRepository.toggleFavorite(projectId, userId);
  }
}
