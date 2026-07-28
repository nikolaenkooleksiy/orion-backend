import { Workspace } from '../model/workspace.model';

export const WORKSPACE_REPOSITORY = Symbol('WORKSPACE_REPOSITORY');

export interface IWorkspaceRepository {
  findAllUserWorkspaces(userId: string): Promise<Workspace[]>;

  findByName(name: string, ownerId: string): Promise<Workspace>;

  create(workspaceId: Workspace): Promise<Workspace>;
  update(workspaceId: Partial<Workspace>): Promise<Workspace>;

  delete(workspaceId: string, ownerId: string): Promise<void>;
}
