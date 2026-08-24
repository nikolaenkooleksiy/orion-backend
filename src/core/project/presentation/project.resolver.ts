import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import type { JwtPayload } from 'src/common/types';
import { ProjectService } from '../app/project.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { ProjectResponseDto } from '../dto/project-response.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Resolver(() => ProjectResponseDto)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [ProjectResponseDto], { name: 'find_all_projects' })
  async findAllProjects(
    @Args('workspaceId') workspaceId: string,
    @CurrentUser() payload: JwtPayload,
  ) {
    return await this.projectService.findAll(workspaceId, payload.sub);
  }

  @Mutation(() => ProjectResponseDto, { name: 'create_project' })
  async createProject(@Args('body') body: CreateProjectDto) {
    return await this.projectService.create(body);
  }

  @Mutation(() => ProjectResponseDto, { name: 'update_project' })
  async updateProject(
    @CurrentUser() payload: JwtPayload,
    @Args('projectId') projectId: string,
    @Args('body') body: UpdateProjectDto,
  ) {
    return await this.projectService.update(projectId, body);
  }

  @Mutation(() => SuccessResponseDto, { name: 'delete_project' })
  async deleteProject(
    @Args('projectId') projectId: string,
    @CurrentUser() payload: JwtPayload,
  ) {
    return this.projectService.delete(projectId, payload.sub);
  }
}
