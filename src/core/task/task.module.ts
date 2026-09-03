import { Module } from '@nestjs/common';
import { TagService } from './app/tag.service';
import { TAG_REPOSITORY } from './domain/types/tag.repository.interface';
import { TASK_REPOSITORY } from './domain/types/task.repository.interface';
import { TagRepository } from './infrastructure/repository/tag.repository';
import { TaskRepository } from './infrastructure/repository/task.repository';
import { TagResolver } from './presentation/tag.resolver';
import { TaskResolver } from './presentation/task.resolver';
import { TaskService } from './app/task.service';

@Module({
  providers: [
    TagService,
    TagResolver,
    TaskResolver,
    TaskService,
    {
      provide: TAG_REPOSITORY,
      useClass: TagRepository,
    },
    {
      provide: TASK_REPOSITORY,
      useClass: TaskRepository,
    },
  ],
  exports: [TagService],
})
export class TaskModule {}
