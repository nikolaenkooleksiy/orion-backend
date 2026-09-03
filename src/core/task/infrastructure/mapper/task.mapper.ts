import { Prisma, Task as PrismaTask } from '@prisma/client';
import { Task } from '../../domain/model/task.model';

export class TaskMapper {
  static toDomain(raw: PrismaTask): Task {
    return Task.restore({ ...raw });
  }

  static toPersistence(task: Task): Prisma.TaskUncheckedCreateInput {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      approvalStatus: task.approvalStatus,
      priority: task.priority,
      dueDate: task.dueDate,
      listId: task.listId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      boardId: task.boardId,
      creatorId: task.creatorId,
    };
  }
}
