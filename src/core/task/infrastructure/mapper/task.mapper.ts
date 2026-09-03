import { Prisma } from '@prisma/client';
import { Task } from '../../domain/model/task.model';

type PrismaTaskWithTags = Prisma.TaskGetPayload<{ include: { tags: true } }>;

export class TaskMapper {
  static toDomain(raw: PrismaTaskWithTags): Task {
    return Task.restore({
      ...raw,
      tagIds: raw.tags.map((tag) => tag.id),
    });
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
      creatorId: task.creatorId,
      assigneeId: task.assigneeId,
      position: task.position,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      tags: {
        connect: task.tagIds.map((tagId) => ({ id: tagId })),
      },
    };
  }
}
