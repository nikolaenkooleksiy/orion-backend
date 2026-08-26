import { randomUUID } from 'crypto';

export interface ListProps {
  id: string;
  name: string;
  boardId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateListProps {
  name: string;
  boardId: string;
}

export class ListModel {
  private constructor(private props: ListProps) {}

  static create(props: CreateListProps) {
    const now = new Date();

    return new ListModel({
      id: randomUUID(),
      name: props.name,
      boardId: props.boardId,
      createdAt: now,
      updatedAt: now,
    });
  }

  static restore(props: ListProps) {
    return new ListModel(props);
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

  get boardId(): string {
    return this.props.boardId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
