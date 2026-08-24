import { Module } from '@nestjs/common';
import { StorageService } from 'src/infrastructure/storage/storage.service';
import { ProjectModule } from '../project/project.module';
import { WorkspaceMembersService } from './app/workspace-members.service';
import { WorkspaceService } from './app/workspace.service';
import { WORKSPACE_MEMBERS_REPOSITORY } from './domain/types/workspace-members.repository.interface';
import { WORKSPACE_REPOSITORY } from './domain/types/workspace.repository.interface';
import { WorkspaceMembersRepository } from './infrastructure/repository/workspace-members.repository';
import { WorkspaceRepository } from './infrastructure/repository/workspace.repository';
import { WorkspaceResolver } from './presentation/workspace.resolver';

@Module({
  exports: [],
  providers: [
    StorageService,
    WorkspaceService,
    WorkspaceMembersService,
    WorkspaceResolver,
    {
      provide: WORKSPACE_REPOSITORY,
      useClass: WorkspaceRepository,
    },
    {
      provide: WORKSPACE_MEMBERS_REPOSITORY,
      useClass: WorkspaceMembersRepository,
    },
  ],
  imports: [ProjectModule],
})
export class WorkspaceModule {}
