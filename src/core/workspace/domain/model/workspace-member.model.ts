export const WorkspaceMemberRoleEnum = {
  OWNER: 'OWNER',
  USER: 'USER',
} as const;

export type WorkspaceMemberRole =
  (typeof WorkspaceMemberRoleEnum)[keyof typeof WorkspaceMemberRoleEnum];

interface WorkspaceMemberProps {
  id: string;

  name: string;
  email: string;

  role: WorkspaceMemberRole;

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkspaceMemberProps {
  name: string;
  email: string;
  role: WorkspaceMemberRole;
}

export class WorkspaceMember {
  private constructor(private props: WorkspaceMemberProps) {}

  static create(props: CreateWorkspaceMemberProps): WorkspaceMember {
    const id = crypto.randomUUID();
    const now = new Date();

    return new WorkspaceMember({
      id,
      ...props,
      createdAt: now,
      updatedAt: now,
    });
  }

  static restore(props: WorkspaceMemberProps): WorkspaceMember {
    return new WorkspaceMember(props);
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get role() {
    return this.props.role;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
