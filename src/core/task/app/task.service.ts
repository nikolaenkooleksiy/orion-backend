import { Inject, Injectable, Logger } from '@nestjs/common';
import { Task } from '../domain/model/task.model';
import {
  type ITaskRepository,
  TASK_REPOSITORY,
} from '../domain/types/task.repository.interface';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: ITaskRepository,
  ) {}

  async findAllByList(listId: string) {
    this.logger.log(`Finding tasks for list: ${listId}`);
    return this.taskRepository.findAllByList(listId);
  }

  async findById(taskId: string) {
    this.logger.log(`Finding task: ${taskId}`);
    return this.taskRepository.findById(taskId);
  }

  async create(body: CreateTaskDto, creatorId: string) {
    this.logger.log(`Creating task: ${body.title}`);
    const task = Task.create({
      ...body,
      creatorId,
    });
    const result = await this.taskRepository.create(task);
    this.logger.log(`Task created: ${result.id}`);
    return result;
  }

  async update(taskId: string, body: UpdateTaskDto) {
    this.logger.log(`Updating task: ${taskId}`);
    const task = await this.taskRepository.findById(taskId);

    if (body.title !== undefined) task.rename(body.title);
    if (body.description !== undefined)
      task.changeDescription(body.description);
    if (body.priority !== undefined) task.changePriority(body.priority);
    if (body.assigneeId !== undefined) {
      if (body.assigneeId === null) {
        task.unassign();
      } else {
        task.assign(body.assigneeId);
      }
    }
    if (body.dueDate !== undefined) task.setDueDate(body.dueDate);

    const result = await this.taskRepository.update(task);
    this.logger.log(`Task updated: ${result.id}`);
    return result;
  }

  async delete(taskId: string) {
    this.logger.log(`Deleting task: ${taskId}`);
    const result = await this.taskRepository.delete(taskId);
    this.logger.log(`Task deleted: ${taskId}`);
    return result;
  }
}
