import { Project } from '../model/project.model';

export const PROJECT_REPOSITORY = Symbol('PROJECT_REPOSITORY');

export interface IProjectRepository {
  findAll: (workspaceId: string, memberId: string) => Promise<Project[]>;
  findById: (projectId: string) => Promise<Project>;
  create: (project: Project) => Promise<Project>;
  update: (project: Project) => Promise<Project>;
  delete: (projectId: string, userId: string) => Promise<void>;
  toggleFavorite: (projectId: string, userId: string) => Promise<void>;
}
