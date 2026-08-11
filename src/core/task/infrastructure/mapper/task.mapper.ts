import { Task as PrismaTask } from '@prisma/client';
import { TaskModel } from '../../domain/model/task.model';
import { TaskResponseDto } from '../../dto/task-response.dto';

export class TaskMapper {
  static toModel(task: PrismaTask): TaskModel {
    return TaskModel.restore({ ...task });
  }

  static toPersistence(task: TaskModel): PrismaTask {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      boardId: task.boardId,
      listId: task.listId,
      position: task.position,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  static toResponse(task: TaskModel): TaskResponseDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      position: task.position,
      createdAt: task.createdAt,
    };
  }

  static toGroupedResponse(
    groupedTasks: Record<string, TaskModel[]>,
  ): Record<string, TaskResponseDto[]> {
    const response: Record<string, TaskResponseDto[]> = {};

    for (const listName in groupedTasks) {
      response[listName] = groupedTasks[listName].map((task) =>
        this.toResponse(task),
      );
    }

    return response;
  }
}
