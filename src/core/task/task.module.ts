import { Module } from '@nestjs/common';
import { LIST_REPOSITORY } from '../project/domain/types/list.repository.interface';
import { ListRepository } from '../project/infrastructure/repository/list.repository';
import { TaskService } from './app/task.service';
import { TASK_REPOSITORY } from './domain/types/task.repository.interface';
import { TaskRepository } from './infrastructure/repository/task.repository';

@Module({
  providers: [
    TaskService,
    {
      provide: TASK_REPOSITORY,
      useClass: TaskRepository,
    },
    {
      provide: LIST_REPOSITORY,
      useClass: ListRepository,
    },
  ],
})
export class TaskModule {}
