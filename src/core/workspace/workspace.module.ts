import { Module } from '@nestjs/common';
import { LlmModule } from 'src/infrastructure/llm/llm.module';
import { StorageService } from 'src/infrastructure/storage/storage.service';
import { ProjectService } from './app/project.service';
import { TodoService } from './app/todo.service';
import { WorkspaceService } from './app/workspace.service';
import { PROJECT_REPOSITORY } from './domain/types/project.repository.interface';
import { TODO_REPOSITORY } from './domain/types/todo.repository.interface';
import { WORKSPACE_REPOSITORY } from './domain/types/workspace.repository.interface';
import { ProjectRepository } from './infrastructure/repository/project.repository';
import { WorkspaceRepository } from './infrastructure/repository/workspace.repository';
import { TodoRepository } from './infrastructure/repository/todo.repository';
import { ProjectController } from './presentation/project.controller';
import { TodoController } from './presentation/todo.controller';
import { WorkspaceController } from './presentation/workspace.controller';

@Module({
  imports: [LlmModule],
  controllers: [TodoController, ProjectController, WorkspaceController],

  exports: [],
  providers: [
    ProjectService,
    TodoService,
    StorageService,
    WorkspaceService,
    {
      provide: TODO_REPOSITORY,
      useClass: TodoRepository,
    },
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
