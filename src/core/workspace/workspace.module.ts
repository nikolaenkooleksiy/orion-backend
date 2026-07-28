import { Module } from '@nestjs/common';
import { LlmModule } from 'src/infrastructure/llm/llm.module';
import { StorageService } from 'src/infrastructure/storage/storage.service';
import { ProjectService } from './app/project.service';
import { WorkspaceService } from './app/workspace.service';
import { PROJECT_REPOSITORY } from './domain/types/project.repository.interface';
import { WORKSPACE_REPOSITORY } from './domain/types/workspace.repository.interface';
import { ProjectRepository } from './infrastructure/repository/project.repository';
import { WorkspaceRepository } from './infrastructure/repository/workspace.repository';
import { ProjectController } from './presentation/project.controller';
import { WorkspaceController } from './presentation/workspace.controller';

@Module({
  imports: [LlmModule],
  controllers: [ProjectController, WorkspaceController],

  exports: [],
  providers: [
    ProjectService,

    StorageService,
    WorkspaceService,

    {
      provide: PROJECT_REPOSITORY,
      useClass: ProjectRepository,
    },
    {
      provide: WORKSPACE_REPOSITORY,
      useClass: WorkspaceRepository,
    },
  ],
})
export class WorkspaceModule {}
