import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import path from 'path';
import { StorageService } from 'src/infrastructure/storage/storage.service';
import { Workspace } from '../domain/model/workspace.model';
import {
  type IWorkspaceRepository,
  WORKSPACE_REPOSITORY,
} from '../domain/types/workspace.repository.interface';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { UpdateWorkspaceDto } from '../dto/update-workspace.dto';
import { WorkspaceMapper } from '../infrastructure/mapper/workspace.mapper';

@Injectable()
export class WorkspaceService {
  constructor(
    @Inject(WORKSPACE_REPOSITORY)
    private readonly workspaceRepository: IWorkspaceRepository,
    private readonly storageService: StorageService,
  ) {}

  private async resolveImageUrl(s3Key: string | null): Promise<string | null> {
    if (!s3Key) return null;
    return this.storageService.getDownloadUrl(s3Key);
  }

  async getWorkspaceByName(name: string, ownerId: string) {
    const workspace = await this.workspaceRepository.findByName(name, ownerId);
    const imageUrl = await this.resolveImageUrl(workspace.imageUrl);
    return WorkspaceMapper.toResponse(workspace, imageUrl);
  }

  async getWorkspaceById(workspaceId: string, ownerId: string) {
    const workspace = await this.workspaceRepository.findById(
      workspaceId,
      ownerId,
    );

    const imageUrl = await this.resolveImageUrl(workspace.imageUrl);

    return WorkspaceMapper.toResponse(workspace, imageUrl);
  }

  async getAllWorkspaces(ownerId: string, name?: string) {
    const workspaces = await this.workspaceRepository.findAllUserWorkspaces(
      ownerId,
      name,
    );
    return Promise.all(
      workspaces.map(async (w) => {
        const imageUrl = await this.resolveImageUrl(w.imageUrl);
        return WorkspaceMapper.toResponse(w, imageUrl);
      }),
    );
  }

  async create(dto: CreateWorkspaceDto, ownerId: string) {
    try {
      const workspace = Workspace.create({ ...dto, imageUrl: dto.imageKey });

      const createdWorkspace = await this.workspaceRepository.create(
        workspace,
        ownerId,
      );

      const fileType = path.extname(dto.imageKey).substring(1);

      const newKey = `workspaces/${createdWorkspace.id}/files/${createdWorkspace.name}-image.${fileType}`;

      await this.storageService.moveFile(dto.imageKey, newKey);

      createdWorkspace.updateImageUrl(newKey);

      await this.workspaceRepository.update(createdWorkspace);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'Workspace with this custom URL already exists',
          );
        }
        throw error;
      }
    }
  }

  async update(workspaceId: string, dto: UpdateWorkspaceDto) {
    try {
      await this.workspaceRepository.update({
        id: workspaceId,
        ...dto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const target = (error.meta?.target as string[])?.[0] ?? 'Field';
          throw new ConflictException(`${target} already exists`);
        }
        throw error;
      }
    }
  }

  async delete(workspaceId: string, ownerId: string) {
    return this.workspaceRepository.delete(workspaceId, ownerId);
  }

  async generateWorkspaceImageUrl(originalName: string, contentType: string) {
    const folder = 'temp/workspace-logos';

    return this.storageService.getUploadUrl(folder, originalName, contentType);
  }
}
