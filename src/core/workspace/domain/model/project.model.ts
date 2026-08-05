import { randomUUID } from 'crypto';

export interface ProjectProps {
  id: string;
  name: string;
  description: string | null;
  workspaceId: string;
  color: string;
  isFavorite?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectProps {
  name: string;
  description?: string | null;
  color: string;
  workspaceId: string;
}

export class Project {
  private constructor(private props: ProjectProps) {}

  static create(props: CreateProjectProps): Project {
    const now = new Date();

    return new Project({
      id: randomUUID(),
      name: props.name,
      description: props.description ?? null,
      workspaceId: props.workspaceId,
      color: props.color,
      isFavorite: false,
      createdAt: now,
      updatedAt: now,
    });
  }

  static restore(props: ProjectProps): Project {
    return new Project({
      ...props,
      isFavorite: props.isFavorite ?? false,
    });
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | null {
    return this.props.description;
  }

  get workspaceId(): string {
    return this.props.workspaceId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get color(): string {
    return this.props.color;
  }

  get isFavorite(): boolean {
    return this.props.isFavorite ?? false;
  }

  setFavorite(isFavorite: boolean): void {
    this.props.isFavorite = isFavorite;
  }

  rename(name: string): void {
    if (!name.trim()) {
      throw new Error('Project name cannot be empty');
    }

    this.props.name = name;
    this.props.updatedAt = new Date();
  }

  changeDescription(description: string | null): void {
    this.props.description = description;
    this.props.updatedAt = new Date();
  }

  changeColor(color: string): void {
    this.props.color = color;
    this.props.updatedAt = new Date();
  }
}
