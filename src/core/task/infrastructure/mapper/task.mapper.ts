import { Task as PrismaTask } from '@prisma/client';
import { TaskModel } from '../../domain/model/task.model';
import { TaskResponseDto } from '../../dto/task-response.dto';

export class TaskMapper {
  static toModel(task: PrismaTask): TaskModel {
    return TaskModel.restore({
      id: task.id,
      title: task.title,
      description: task.description,
      position: task.position,
    });
  }

  static toPersistence(task: TaskModel) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      position: task.position,
    };
  }

  static toResponse(task: TaskModel): TaskResponseDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      position: task.position,
      createdAt: new Date(),
    };
  }
}
