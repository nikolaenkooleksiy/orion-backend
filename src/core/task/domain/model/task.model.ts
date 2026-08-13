import { TaskApprovalStatus, TaskPriority } from '@prisma/client';
import { randomUUID } from 'crypto';

interface TaskModelProps {
  id: string;
  title: string;
  boardId: string;
  listId: string;
  creatorId: string;
  approvalStatus?: TaskApprovalStatus;
  priority?: TaskPriority;
  description: string | null;
  position: number;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateTaskModelProps {
  title: string;
  description: string | null;
  boardId: string;
  listId: string;
  creatorId: string;
  approvalStatus?: TaskApprovalStatus;

  priority?: TaskPriority;
  position?: number;
}

export class TaskModel {
  private constructor(private props: TaskModelProps) {}

  static create(props: CreateTaskModelProps): TaskModel {
    return new TaskModel({
      id: randomUUID(),
      title: props.title,
      listId: props.listId,
      boardId: props.boardId,
      creatorId: props.creatorId,
      description: props.description,
      approvalStatus: props.approvalStatus ?? TaskApprovalStatus.Pending,
      priority: props.priority ?? TaskPriority.LOW,
      position: props.position ?? 1000,
      dueDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static restore(props: TaskModelProps): TaskModel {
    return new TaskModel(props);
  }

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | null {
    return this.props.description ?? null;
  }

  get position(): number {
    return this.props.position;
  }

  get boardId(): string {
    return this.props.boardId;
  }

  get listId(): string {
    return this.props.listId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get creatorId(): string {
    return this.props.creatorId;
  }

  get approvalStatus(): TaskApprovalStatus {
    return this.props.approvalStatus!;
  }

  get priority(): TaskPriority {
    return this.props.priority!;
  }

  get dueDate(): Date | null {
    return this.props.dueDate;
  }
}
