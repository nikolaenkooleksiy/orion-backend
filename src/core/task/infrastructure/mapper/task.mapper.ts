import { Prisma, Task as PrismaTask, TaskPriority } from '@prisma/client';
import { TaskModel } from '../../domain/model/task.model';
import { TaskResponseDto } from '../../dto/task-response.dto';

const PRIORITY_TO_NUMBER: Record<TaskPriority, string> = {
  LOW: '3',
  MEDIUM: '2',
  HIGH: '1',
};

export class TaskMapper {
  static toModel(task: PrismaTask): TaskModel {
    return TaskModel.restore({ ...task });
  }

  static toPersistence(task: TaskModel): Prisma.TaskCreateInput {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      board: {
        connect: { id: task.boardId },
      },
      list: {
        connect: { id: task.listId },
      },
      creator: {
        connect: { id: task.creatorId },
      },
      approvalStatus: task.approvalStatus,
      priority: task.priority,
      position: task.position,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  static toResponse(task: TaskModel, listTitle: string): TaskResponseDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      position: task.position,
      createdAt: task.createdAt,
      dueDate: task.dueDate,
      approvalStatus: task.approvalStatus,
      priority: PRIORITY_TO_NUMBER[task.priority],
      createdBy: task.creatorId,
      listTitle,
    };
  }

  static toGroupedResponse(
    groupedTasks: Record<string, TaskModel[]>,
  ): Record<string, TaskResponseDto[]> {
    const response: Record<string, TaskResponseDto[]> = {};

    for (const listName in groupedTasks) {
      response[listName] = groupedTasks[listName].map((task) =>
        this.toResponse(task, listName),
      );
    }

    return response;
  }
}
