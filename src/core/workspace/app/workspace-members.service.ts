import { Inject, Injectable } from '@nestjs/common';
import {
  type IWorkspaceMembersRepository,
  WORKSPACE_MEMBERS_REPOSITORY,
} from '../domain/types/workspace-members.repository.interface';

@Injectable()
export class WorkspaceMembersService {
  constructor(
    @Inject(WORKSPACE_MEMBERS_REPOSITORY)
    private readonly workspaceMembersRepository: IWorkspaceMembersRepository,
  ) {}

  async findAll(workspaceId: string, memberId: string) {
    return this.workspaceMembersRepository.findAll(workspaceId, memberId);
  }
}
