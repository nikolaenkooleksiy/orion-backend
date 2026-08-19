import { Workspace } from '../model/workspace.model';

export const WORKSPACE_REPOSITORY = Symbol('WORKSPACE_REPOSITORY');

export interface WorkspaceSearchOptions {
  name?: string;
}

export interface IWorkspaceRepository {
  findAllUserWorkspaces: (
    userId: string,
    options?: WorkspaceSearchOptions,
  ) => Promise<Workspace[]>;

  findById: (workspaceId: string, memberId: string) => Promise<Workspace>;

  create: (ownerId: string, workspace: Workspace) => Promise<Workspace>;
  update: (workspace: Workspace) => Promise<Workspace>;

  delete: (workspaceId: string, ownerId: string) => Promise<void>;
}
