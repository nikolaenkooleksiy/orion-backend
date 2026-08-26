import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Workspace } from '../../domain/model/workspace.model';
import {
  IWorkspaceRepository,
  WorkspaceSearchOptions,
} from '../../domain/types/workspace.repository.interface';

interface WorkspaceMemberRecord {
  workspaceId: string;
  userId: string;
  role: 'OWNER' | 'MEMBER';
}

@Injectable()
export class WorkspaceInMemoryRepository implements IWorkspaceRepository {
  private workspaces = new Map<string, Workspace>();

  private members: WorkspaceMemberRecord[] = [];

  async findAllUserWorkspaces(
    userId: string,
    options?: WorkspaceSearchOptions,
  ): Promise<Workspace[]> {
    const userWorkspaceIds = this.members
      .filter((m) => m.userId === userId)
      .map((m) => m.workspaceId);

    let result = userWorkspaceIds
      .map((id) => this.workspaces.get(id))
      .filter((w): w is Workspace => w !== undefined);

    if (options?.name) {
      const search = options.name.toLowerCase().trim();
      result = result.filter((w) => w.name.toLowerCase().includes(search));
    }

    return Promise.resolve(result);
  }

  async findById(identifier: string, memberId: string): Promise<Workspace> {
    let workspace = this.workspaces.get(identifier);

    if (!workspace) {
      workspace = Array.from(this.workspaces.values()).find(
        (w) => w.customUrl === identifier,
      );
    }

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    const isMember = this.members.some(
      (m) => m.workspaceId === workspace.id && m.userId === memberId,
    );

    if (!isMember) {
      throw new ForbiddenException('You do not have access to this workspace');
    }

    return Promise.resolve(workspace);
  }

  async create(ownerId: string, workspace: Workspace): Promise<Workspace> {
    this.workspaces.set(workspace.id, workspace);

    this.members.push({
      workspaceId: workspace.id,
      userId: ownerId,
      role: 'OWNER',
    });

    return Promise.resolve(workspace);
  }

  async update(workspace: Workspace): Promise<Workspace> {
    if (!this.workspaces.has(workspace.id)) {
      throw new NotFoundException('Workspace not found');
    }

    this.workspaces.set(workspace.id, workspace);
    return Promise.resolve(workspace);
  }

  delete(workspaceId: string, ownerId: string): Promise<void> {
    const workspace = this.workspaces.get(workspaceId);
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    const isOwner = this.members.some(
      (m) =>
        m.workspaceId === workspaceId &&
        m.userId === ownerId &&
        m.role === 'OWNER',
    );

    if (!isOwner) {
      throw new ForbiddenException('Only the owner can delete this workspace');
    }

    this.workspaces.delete(workspaceId);
    this.members = this.members.filter((m) => m.workspaceId !== workspaceId);

    return Promise.resolve();
  }
}
