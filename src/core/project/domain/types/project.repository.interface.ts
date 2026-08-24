import { Project } from '../model/project.model';

export const PROJECT_REPOSITORY = Symbol('PROJECT_REPOSITORY');

export interface IProjectRepository {
  findAll(workspaceId: string, memberId: string): Promise<Project[]>;

  create(project: Project): Promise<Project>;

  update(projectId: string, project: Partial<Project>): Promise<Project | null>;

  delete(projectId: string, userId: string): Promise<void>;

  addToFavorites(projectId: string, userId: string): Promise<void>;
}
