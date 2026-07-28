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

  async getWorkspaceByName(name: string, ownerId: string) {
    return WorkspaceMapper.toResponse(
      await this.workspaceRepository.findByName(name, ownerId),
    );
  }

  async getAllWorkspaces(ownerId: string) {
    return (await this.workspaceRepository.findAllUserWorkspaces(ownerId)).map(
      (t) => WorkspaceMapper.toResponse(t),
    );
  }

  async create(dto: CreateWorkspaceDto, ownerId: string) {
    try {
      const workspace = Workspace.create({ ...dto });
      const createdWorkspace = await this.workspaceRepository.create(
        workspace,
        ownerId,
      );

      const fileType = path.extname(dto.imageKey).substring(1);

      const newKey = `workspaces/${createdWorkspace.id}/files/${createdWorkspace.name}-image.${fileType}`;

      await this.storageService.moveFile(dto.imageKey, newKey);

      const imageUrl = await this.storageService.getDownloadUrl(newKey);

      createdWorkspace.updateImageUrl(imageUrl);

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
