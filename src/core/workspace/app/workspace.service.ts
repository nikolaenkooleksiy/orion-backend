import { Inject, Injectable } from '@nestjs/common';
import { StorageService } from 'src/infrastructure/storage/storage.service';
import { Workspace } from '../domain/model/workspace.model';
import {
  type IWorkspaceRepository,
  WORKSPACE_REPOSITORY,
  WorkspaceSearchOptions,
} from '../domain/types/workspace.repository.interface';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { UpdateWorkspaceDto } from '../dto/update-workspace.dto';

@Injectable()
export class WorkspaceService {
  constructor(
    @Inject(WORKSPACE_REPOSITORY)
    private readonly workspaceRepository: IWorkspaceRepository,
    private readonly storageService: StorageService,
  ) {}

  async findAllUserWorkspaces(
    userId: string,
    options?: WorkspaceSearchOptions,
  ) {
    const workspaces = await this.workspaceRepository.findAllUserWorkspaces(
      userId,
      options,
    );

    return workspaces;
  }

  async findWorkspaceById(workspaceId: string, memberId: string) {
    const workspace = await this.workspaceRepository.findById(
      workspaceId,
      memberId,
    );

    return workspace;
  }

  async createWorkspace(ownerId: string, body: CreateWorkspaceDto) {
    const workspace = Workspace.create({
      ...body,
    });

    return this.workspaceRepository.create(ownerId, workspace);
  }

  async updateWorkspace(
    workspaceId: string,
    body: UpdateWorkspaceDto,
    ownerId: string,
  ) {
    const workspace = await this.workspaceRepository.findById(
      workspaceId,
      ownerId,
    );

    if (body.name !== undefined) {
      workspace.updateName(body.name);
    }
    if (body.description !== undefined) {
      workspace.updateDescription(body.description);
    }
    if (body.customUrl !== undefined) {
      workspace.updateCustomUrl(body.customUrl);
    }

    return this.workspaceRepository.update(workspace);
  }

  async deleteWorkspace(workspaceId: string, ownerId: string) {
    await this.workspaceRepository.delete(workspaceId, ownerId);

    return {
      isSuccessful: true,
    };
  }
}
