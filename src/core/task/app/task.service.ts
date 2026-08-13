import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  type IListRepository,
  LIST_REPOSITORY,
} from 'src/core/project/domain/types/list.repository.interface';
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
    @Inject(LIST_REPOSITORY) private readonly listRepository: IListRepository,
  ) {}

  async getAllTasks(boardId: string) {
    const tasks = await this.taskRepository.getAllTasks(boardId);

    return TaskMapper.toGroupedResponse(tasks);
  }

  async getTaskById(taskId: string) {
    try {
      const task = await this.taskRepository.getTaskById(taskId);

      const list = await this.listRepository.findById(task.boardId);

      return TaskMapper.toResponse(task, list.name);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Task with ID ${taskId} not found`);
        }
      }
    }
  }

  async createTask(creatorId: string, body: CreateTaskDto) {
    try {
      const data = TaskModel.create({ ...body, creatorId });

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
