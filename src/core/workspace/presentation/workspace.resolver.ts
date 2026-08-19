import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { type JwtPayload } from 'src/common/types';
import { WorkspaceService } from '../app/workspace.service';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { UpdateWorkspaceDto } from '../dto/update-workspace.dto';
import { WorkspaceResponseType } from '../dto/workspace-response.dto';
import { WorkspaceSearchOptionsDto } from '../dto/workspace-search-options.dto';

@Resolver(() => WorkspaceResponseType)
export class WorkspaceResolver {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Query(() => [WorkspaceResponseType], { name: 'find_all_workspaces' })
  async findAllWorkspaces(
    @CurrentUser() payload: JwtPayload,
    @Args('options', { nullable: true }) options?: WorkspaceSearchOptionsDto,
  ) {
    return await this.workspaceService.findAllUserWorkspaces(
      payload.sub,
      options,
    );
  }

  @Query(() => WorkspaceResponseType, { name: 'find_workspace_by_id' })
  async findWorkspaceById(
    @CurrentUser() payload: JwtPayload,
    @Args('workspaceId') workspaceId: string,
  ) {
    return await this.workspaceService.findWorkspaceById(
      workspaceId,
      payload.sub,
    );
  }

  @Mutation(() => WorkspaceResponseType, { name: 'create_workspace' })
  async createWorkspace(
    @CurrentUser() payload: JwtPayload,
    @Args('body') body: CreateWorkspaceDto,
  ) {
    return await this.workspaceService.createWorkspace(payload.sub, body);
  }

  @Mutation(() => WorkspaceResponseType, { name: 'update_workspace' })
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
