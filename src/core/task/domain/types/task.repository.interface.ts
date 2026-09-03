import { Task } from '../model/task.model';

export const TASK_REPOSITORY = Symbol('TASK_REPOSITORY');

export interface ITaskRepository {
  findAllByList: (listId: string) => Promise<Task[]>;
  findById: (taskId: string) => Promise<Task>;
  create: (task: Task) => Promise<Task>;
  update: (task: Task) => Promise<Task>;
  delete: (taskId: string) => Promise<boolean>;
}
