import { Module } from '@nestjs/common';
import { TaskService } from './app/task.service';
import { TASK_REPOSITORY } from './domain/types/task.repository.interface';
import { TaskRepository } from './infrastructure/repository/task.repository';
import { TaskController } from './presentation/task.controller';

@Module({
  providers: [
    TaskService,
    {
      provide: TASK_REPOSITORY,
      useClass: TaskRepository,
    },
  ],
  controllers: [TaskController],
})
export class TaskModule {}
