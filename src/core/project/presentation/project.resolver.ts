import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import type { JwtPayload } from 'src/common/types';
import { BoardService } from '../app/board.service';
import { ProjectService } from '../app/project.service';
import { BoardResponseDto } from '../dto/board-response.dto';
import { CreateProjectDto } from '../dto/create-project.dto';
import { ProjectResponseDto } from '../dto/project-response.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Resolver(() => ProjectResponseDto)
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly boardService: BoardService,
  ) {}

  @ResolveField('boards', () => [BoardResponseDto], { nullable: true })
  async getBoards(@Parent() project: ProjectResponseDto) {
    return this.boardService.findByProjectId(project.id);
  }

  @Query(() => [ProjectResponseDto], { name: 'find_all_projects' })
  async findAllProjects(
    @Args('workspaceId') workspaceId: string,
    @CurrentUser() payload: JwtPayload,
  ) {
    return await this.projectService.findAll(workspaceId, payload.sub);
  }

  @Query(() => ProjectResponseDto, { name: 'find_project_by_id' })
  async findProjectById(
    @Args('workspaceId') workspaceId: string,
    @Args('projectId') projectId: string,
    @CurrentUser() payload: JwtPayload,
  ) {
    return await this.projectService.findById(
      workspaceId,
      projectId,
      payload.sub,
    );
  }

  @Mutation(() => ProjectResponseDto, { name: 'create_project' })
  async createProject(@Args('body') body: CreateProjectDto) {
    return await this.projectService.create(body);
  }

  @Mutation(() => ProjectResponseDto, { name: 'update_project' })
  async updateProject(
    @Args('workspaceId') workspaceId: string,
    @Args('projectId') projectId: string,
    @CurrentUser() payload: JwtPayload,

    @Args('body') body: UpdateProjectDto,
  ) {
    return await this.projectService.update(
      workspaceId,
      projectId,
      payload.sub,
      body,
    );
  }
  @Mutation(() => SuccessResponseDto, { name: 'toggle_favorite_project' })
  async toggleFavorite(
    @Args('projectId') projectId: string,
    @CurrentUser() payload: JwtPayload,
  ) {
    await this.projectService.toggleFavorite(projectId, payload.sub);
    return { isSuccessful: true };
  }

  @Mutation(() => SuccessResponseDto, { name: 'delete_project' })
  async deleteProject(
    @Args('projectId') projectId: string,
    @CurrentUser() payload: JwtPayload,
  ) {
    return this.projectService.delete(projectId, payload.sub);
  }
}
