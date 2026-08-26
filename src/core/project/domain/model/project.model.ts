import { randomUUID } from 'crypto';

export interface ProjectProps {
  id: string;
  name: string;
  description: string | null;
  workspaceId: string;
  color: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectProps {
  name: string;
  description?: string | null;
  workspaceId: string;
}

export class Project {
  private constructor(private props: ProjectProps) {}

  static create(props: CreateProjectProps) {
    const now = new Date();

    return new Project({
      id: randomUUID(),
      name: props.name,
      description: props.description ?? null,
      color: 'bg-blue-500',
      workspaceId: props.workspaceId,
      isFavorite: false,
      createdAt: now,
      updatedAt: now,
    });
  }

  static restore(props: ProjectProps) {
    return new Project({
      ...props,
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

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get color(): string {
    return this.props.color;
  }

  get workspaceId(): string {
    return this.props.workspaceId;
  }

  get isFavorite(): boolean {
    return this.props.isFavorite ?? false;
  }

  setFavorite(isFavorite: boolean) {
    this.props.isFavorite = isFavorite;
  }

  rename(name: string) {
    if (!name.trim()) {
      throw new Error('Project name cannot be empty');
    }

    this.props.name = name;
    this.props.updatedAt = new Date();
  }

  changeDescription(description: string | null) {
    this.props.description = description;
    this.props.updatedAt = new Date();
  }

  changeColor(color: string) {
    this.props.color = color;
    this.props.updatedAt = new Date();
  }
}
