import { Module } from '@nestjs/common';
import { StorageService } from 'src/infrastructure/storage/storage.service';
import { BoardService } from './app/board.service';
import { ProjectService } from './app/project.service';
import { BOARD_REPOSITORY } from './domain/types/board.repository.interface';
import { LIST_REPOSITORY } from './domain/types/list.repository.interface';
import { PROJECT_REPOSITORY } from './domain/types/project.repository.interface';
import { BoardRepository } from './infrastructure/repository/board.repository';
import { ListRepository } from './infrastructure/repository/list.repository';
import { ProjectRepository } from './infrastructure/repository/project.repository';
import { BoardResolver } from './presentation/board.resolver';
import { ProjectResolver } from './presentation/project.resolver';

@Module({
  providers: [
    ProjectService,
    BoardService,
    StorageService,
    ProjectResolver,
    BoardResolver,
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
  exports: [ProjectService, BoardService],
})
export class ProjectModule {}
