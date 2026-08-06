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

  static create(props: CreateListProps): ListModel {
    const now = new Date();

    return new ListModel({
      id: randomUUID(),
      name: props.name,
      boardId: props.boardId,
      createdAt: now,
      updatedAt: now,
    });
  }

  static restore(props: ListProps): ListModel {
    return new ListModel(props);
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
