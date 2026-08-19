import { randomUUID } from 'crypto';

export interface CreateWorkspaceProps {
  name: string;
  description?: string | null;
  imageKey: string;
  customUrl?: string | null;
}

export interface WorkspaceProps {
  id: string;
  name: string;
  description: string | null;
  imageKey: string;
  customUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Workspace {
  private constructor(private props: WorkspaceProps) {}

  static create(props: CreateWorkspaceProps) {
    const trimmedName = props.name?.trim();

    if (!trimmedName) {
      throw new Error('Workspace name cannot be empty');
    }

    const now = new Date();

    return new Workspace({
      id: randomUUID(),
      name: trimmedName,
      description: props.description?.trim() ?? null,
      imageKey: props.imageKey,
      customUrl: props.customUrl?.trim() ?? null,
      createdAt: now,
      updatedAt: now,
    });
  }

  static restore(props: WorkspaceProps) {
    return new Workspace(props);
  }

  public updateName(name: string) {
    const trimmedName = name?.trim();
    if (!trimmedName) {
      throw new Error('Workspace name cannot be empty');
    }

    this.props.name = trimmedName;
    this.touch();
  }

  public updateDescription(description: string | null) {
    this.props.description = description?.trim() ?? null;
    this.touch();
  }

  public updateImage(imageKey: string) {
    this.props.imageKey = imageKey;
    this.touch();
  }

  public updateCustomUrl(customUrl: string | null) {
    this.props.customUrl = customUrl?.trim() ?? null;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  public toProps() {
    return { ...this.props };
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get imageKey() {
    return this.props.imageKey;
  }

  get customUrl() {
    return this.props.customUrl;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}

//TODO: fix CRUD operations for workspaces, so that users can create, read, update and delete workspaces

//TODO: add a custom URL system for workspaces, so that users can have a custom URL for their workspace instead of a random UUID

//TODO: add invitation system for workspaces, so that users can be invited to join a workspace

//TODO: add a system  user permissions for workspaces, so that users can have different levels of access to a workspace
