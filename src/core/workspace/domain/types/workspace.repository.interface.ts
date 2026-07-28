import { Workspace } from '../model/workspace.model';

export const WORKSPACE_REPOSITORY = Symbol('WORKSPACE_REPOSITORY');

export interface IWorkspaceRepository {
  findAllUserWorkspaces(userId: string): Promise<Workspace[]>;

  findByName(name: string, ownerId: string): Promise<Workspace>;

  create(workspace: Workspace, memberId: string): Promise<Workspace>;
  update(workspace: Partial<Workspace>): Promise<Workspace>;

  delete(workspaceId: string, ownerId: string): Promise<void>;
}
