import { randomUUID } from 'crypto';

interface CreateWorkspaceProps {
  name: string;
  description?: string | null;
  imageUrl: string;
  customUrl?: string | null;
}

interface WorkspaceProps {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  customUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Workspace {
  private constructor(private props: WorkspaceProps) {}

  static create(props: CreateWorkspaceProps, id?: string): Workspace {
    const now = new Date();

    return new Workspace({
      id: id ?? randomUUID(),
      name: props.name,
      description: props.description ?? null,
      imageUrl: props.imageUrl,
      customUrl: props.customUrl ?? null,
      createdAt: now,
      updatedAt: now,
    });
  }

  static restore(props: WorkspaceProps): Workspace {
    return new Workspace(props);
  }

  public updateImageUrl(imageUrl: string): void {
    this.props.imageUrl = imageUrl;
    this.props.updatedAt = new Date();
  }

  public toProps(): WorkspaceProps {
    return { ...this.props };
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get description(): string | null {
    return this.props.description;
  }

  get imageUrl(): string | null {
    return this.props.imageUrl;
  }

  get customUrl(): string | null {
    return this.props.customUrl;
  }
}
