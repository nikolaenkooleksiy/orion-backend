import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { Task } from '../../domain/model/task.model';
import { ITaskRepository } from '../../domain/types/task.repository.interface';
import { TaskMapper } from '../mapper/task.mapper';

export class TaskRepository implements ITaskRepository {
  constructor(private readonly db: PrismaService) {}

  async findAllByList(listId: string) {
    const tasks = await this.db.task.findMany({
      where: {
        listId,
      },
    });

    return tasks.map((t) => TaskMapper.toDomain(t));
  }

  async findById(taskId: string) {
    const task = await this.db.task.findUniqueOrThrow({
      where: {
        id: taskId,
      },
    });

    return TaskMapper.toDomain(task);
  }

  async create(task: Task) {
    const data = TaskMapper.toPersistence(task);

    const newTask = await this.db.task.create({
      data,
    });

    return TaskMapper.toDomain(newTask);
  }

  async update(task: Task) {
    const data = TaskMapper.toPersistence(task);

    const updatedTask = await this.db.task.update({
      where: {
        id: task.id,
      },
      data,
    });

    return TaskMapper.toDomain(updatedTask);
  }

  async delete(taskId: string) {
    await this.db.task.delete({
      where: {
        id: taskId,
      },
    });

    return true;
  }
}
