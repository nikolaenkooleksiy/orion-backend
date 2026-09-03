import { Injectable } from '@nestjs/common';
import { Task } from '../../domain/model/task.model';
import { ITaskRepository } from '../../domain/types/task.repository.interface';

@Injectable()
export class InMemoryTaskRepository implements ITaskRepository {
  private readonly tasks = new Map<string, Task>();

  async findAllByList(listId: string): Promise<Task[]> {
    return Promise.resolve(
      Array.from(this.tasks.values()).filter((task) => task.listId === listId),
    );
  }

  async findById(taskId: string): Promise<Task> {
    const task = this.tasks.get(taskId);
    if (!task) return Promise.reject(new Error('Task not found'));
    return Promise.resolve(task);
  }

  async create(task: Task): Promise<Task> {
    this.tasks.set(task.id, task);
    return Promise.resolve(task);
  }

  async update(task: Task): Promise<Task> {
    this.tasks.set(task.id, task);
    return Promise.resolve(task);
  }

  async delete(taskId: string): Promise<boolean> {
    if (!this.tasks.has(taskId)) {
      return Promise.reject(new Error('Task not found'));
    }
    this.tasks.delete(taskId);
    return Promise.resolve(true);
  }
}
