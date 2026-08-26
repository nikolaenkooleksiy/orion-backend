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
import { type JwtPayload } from 'src/common/types';
import { ProjectResponseDto } from 'src/core/project/dto/project-response.dto';
import { WorkspaceMembersService } from '../app/workspace-members.service';
import { WorkspaceService } from '../app/workspace.service';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { UpdateWorkspaceDto } from '../dto/update-workspace.dto';
import { WorkspaceMembersResponseDto } from '../dto/workspace-members-response.dto';
import { WorkspaceResponseDto } from '../dto/workspace-response.dto';
import { WorkspaceSearchOptionsDto } from '../dto/workspace-search-options.dto';
import { ProjectService } from 'src/core/project/app/project.service';

@Resolver(() => WorkspaceResponseDto)
export class WorkspaceResolver {
  constructor(
    private readonly workspaceService: WorkspaceService,
    private readonly workspaceMembersService: WorkspaceMembersService,
    private readonly projectService: ProjectService,
  ) {}

  @ResolveField('members', () => [WorkspaceMembersResponseDto], {
    nullable: true,
  })
  async getAllWorkspaceMembers(
    @Parent() workspace: WorkspaceResponseDto,
    @CurrentUser() payload: JwtPayload,
  ) {
    return this.workspaceMembersService.findAll(workspace.id, payload.sub);
  }

  @ResolveField('projects', () => [ProjectResponseDto], {
    nullable: true,
  })
  async getAllWorkspaceProjects(
    @Parent() workspace: WorkspaceResponseDto,
    @CurrentUser() payload: JwtPayload,
  ) {
    return this.projectService.findAll(workspace.id, payload.sub);
  }

  @Query(() => [WorkspaceResponseDto], { name: 'find_all_workspaces' })
  async findAllWorkspaces(
    @CurrentUser() payload: JwtPayload,
    @Args('options', { nullable: true }) options?: WorkspaceSearchOptionsDto,
  ) {
    return await this.workspaceService.findAllUserWorkspaces(
      payload.sub,
      options,
    );
  }

  @Query(() => WorkspaceResponseDto, { name: 'find_workspace_by_id' })
  async findWorkspaceById(
    @CurrentUser() payload: JwtPayload,
    @Args('workspaceId') workspaceId: string,
  ) {
    return await this.workspaceService.findWorkspaceById(
      workspaceId,
      payload.sub,
    );
  }

  @Mutation(() => WorkspaceResponseDto, { name: 'create_workspace' })
  async createWorkspace(
    @CurrentUser() payload: JwtPayload,
    @Args('body') body: CreateWorkspaceDto,
  ) {
    return await this.workspaceService.createWorkspace(payload.sub, body);
  }

  @Mutation(() => WorkspaceResponseDto, { name: 'update_workspace' })
  async updateWorkspace(
    @CurrentUser() payload: JwtPayload,
    @Args('workspaceId') workspaceId: string,
    @Args('body') body: UpdateWorkspaceDto,
  ) {
    return await this.workspaceService.updateWorkspace(
      workspaceId,
      body,
      payload.sub,
    );
  }

  @Mutation(() => SuccessResponseDto, { name: 'delete_workspace' })
  async deleteWorkspace(
    @CurrentUser() payload: JwtPayload,
    @Args('workspaceId') workspaceId: string,
  ) {
    return await this.workspaceService.deleteWorkspace(
      workspaceId,
      payload.sub,
    );
  }
}
