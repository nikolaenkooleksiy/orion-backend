import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TaskModel } from '../domain/model/task.model';
import {
  type ITaskRepository,
  TASK_REPOSITORY,
} from '../domain/types/task.repository.interface';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskMapper } from '../infrastructure/mapper/task.mapper';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: ITaskRepository,
  ) {}

  async getAllTasks(boardId: string) {
    const tasks = await this.taskRepository.getAllTasks(boardId);

    return tasks.map((task) => TaskMapper.toResponse(task));
  }

  async getTaskById(taskId: string) {
    try {
      const task = await this.taskRepository.getTaskById(taskId);

      return TaskMapper.toResponse(task);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Task with ID ${taskId} not found`);
        }
      }
    }
  }

  async createTask(body: CreateTaskDto) {
    try {
      const data = TaskModel.create({ ...body });

      return this.taskRepository.createTask(data);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new NotFoundException(
            `List with ID ${body.listId} or Board with ID ${body.boardId} not found`,
          );
        }
      }
    }
  }
}
