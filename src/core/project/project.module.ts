import { Module } from '@nestjs/common';
import { StorageService } from 'src/infrastructure/storage/storage.service';
import { ProjectService } from './app/project.service';
import { BOARD_REPOSITORY } from './domain/types/board.repository.interface';
import { LIST_REPOSITORY } from './domain/types/list.repository.interface';
import { PROJECT_REPOSITORY } from './domain/types/project.repository.interface';
import { BoardRepository } from './infrastructure/repository/board.repository';
import { ListRepository } from './infrastructure/repository/list.repository';
import { ProjectRepository } from './infrastructure/repository/project.repository';
import { ProjectController } from './presentation/project.controller';

@Module({
  controllers: [ProjectController],
  providers: [
    ProjectService,
    StorageService,
    {
      provide: PROJECT_REPOSITORY,
      useClass: ProjectRepository,
    },
    {
      provide: BOARD_REPOSITORY,
      useClass: BoardRepository,
    },
    {
      provide: LIST_REPOSITORY,
      useClass: ListRepository,
    },
  ],
})
export class ProjectModule {}
