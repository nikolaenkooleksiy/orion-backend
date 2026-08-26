import { WorkspaceMember } from '../model/workspace-member.model';

export const WORKSPACE_MEMBERS_REPOSITORY = Symbol(
  'WORKSPACE_MEMBERS_REPOSITORY',
);

export interface IWorkspaceMembersRepository {
  findAll: (
    workspaceId: string,
    memberId: string,
  ) => Promise<WorkspaceMember[]>;
}
