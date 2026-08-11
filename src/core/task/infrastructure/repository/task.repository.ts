import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { TaskModel } from '../../domain/model/task.model';
import { ITaskRepository } from '../../domain/types/task.repository.interface';
import { TaskMapper } from '../mapper/task.mapper';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(private readonly db: PrismaService) {}

  async getAllTasks(boardId: string): Promise<Record<string, TaskModel[]>> {
    const tasks = await this.db.task.findMany({
      where: { boardId },
      include: {
        list: {
          select: {
            name: true,
          },
        },
      },
    });

    return tasks.reduce(
      (acc, task) => {
        const listName = task.list.name;

        if (!acc[listName]) {
          acc[listName] = [];
        }

        acc[listName].push(TaskMapper.toModel(task));

        return acc;
      },
      {} as Record<string, TaskModel[]>,
    );
  }
  async getTaskById(taskId: string): Promise<TaskModel> {
    const task = await this.db.task.findUniqueOrThrow({
      where: { id: taskId },
    });

    return TaskMapper.toModel(task);
  }

  async createTask(task: TaskModel) {
    return await this.db.$transaction(async (tx) => {
      const lastTask = await tx.task.findFirst({
        where: { listId: task.listId },
        orderBy: { position: 'desc' },
        select: { position: true },
      });

      const newPosition = lastTask ? lastTask.position + 1000 : 1000;

      await tx.task.create({
        data: {
          id: task.id,
          title: task.title,
          description: task.description,
          listId: task.listId,
          boardId: task.boardId,
          position: newPosition,
        },
      });
    });
  }

  async updateTask(task: TaskModel): Promise<void> {
    const data = TaskMapper.toPersistence(task);

    await this.db.task.update({
      where: { id: task.id },
      data,
    });
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.db.task.delete({
      where: { id: taskId },
    });
  }
}
