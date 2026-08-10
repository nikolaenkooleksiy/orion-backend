import { TaskModel } from '../model/task.model';

export const TASK_REPOSITORY = Symbol('TASK_REPOSITORY');

export interface ITaskRepository {
  getAllTasks(boardId: string): Promise<TaskModel[]>;
  getTaskById(taskId: string): Promise<TaskModel>;

  createTask(task: TaskModel): Promise<void>;
  updateTask(task: TaskModel): Promise<void>;

  deleteTask(id: string): Promise<void>;
}
