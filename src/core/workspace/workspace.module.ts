import { Module } from '@nestjs/common';
import { StorageService } from 'src/infrastructure/storage/storage.service';
import { WorkspaceService } from './app/workspace.service';
import { WORKSPACE_REPOSITORY } from './domain/types/workspace.repository.interface';
import { WorkspaceRepository } from './infrastructure/repository/workspace.repository';
import { WorkspaceController } from './presentation/workspace.controller';

@Module({
  controllers: [WorkspaceController],
  exports: [],
  providers: [
    StorageService,
    WorkspaceService,
    {
      provide: WORKSPACE_REPOSITORY,
      useClass: WorkspaceRepository,
    },
  ],
})
export class WorkspaceModule {}
