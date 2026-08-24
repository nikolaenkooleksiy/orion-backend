import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { JwtPayload } from 'src/common/types';
import { ProjectService } from '../app/project.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { ProjectResponseDto } from '../dto/project-response.dto';

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
}
