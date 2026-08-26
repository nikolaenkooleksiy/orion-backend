import { randomUUID } from 'crypto';

export interface BoardProps {
  id: string;
  name: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBoardProps {
  name: string;
  projectId: string;
}

export class BoardModel {
  private constructor(private props: BoardProps) {}

  static create(props: CreateBoardProps) {
    const now = new Date();

    return new BoardModel({
      id: randomUUID(),
      name: props.name,
      projectId: props.projectId,
      createdAt: now,
      updatedAt: now,
    });
  }

  static restore(props: BoardProps) {
    return new BoardModel(props);
  }

  rename(name: string) {
    this.props.name = name;
    this.props.updatedAt = new Date();
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get projectId(): string {
    return this.props.projectId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
