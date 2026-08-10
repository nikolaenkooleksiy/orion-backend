import { TaskModel } from '../model/task.model';

export const TASK_REPOSITORY = Symbol('TASK_REPOSITORY');

export interface ITaskRepository {
  getAllTasks(): Promise<TaskModel[]>;
  getTaskById(id: string): Promise<TaskModel | null>;

  createTask(task: TaskModel): Promise<void>;
  updateTask(task: Partial<TaskModel>): Promise<void>;

  deleteTask(id: string): Promise<void>;
}
