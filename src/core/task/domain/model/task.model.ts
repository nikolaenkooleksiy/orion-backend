import { ApprovalStatus } from '@prisma/client';
import { randomUUID } from 'crypto';
import { CreateTaskProps, TaskProps } from '../types/task.types';

export class Task {
  private constructor(private props: TaskProps) {}

  static create(props: CreateTaskProps) {
    const trimmedTitle = props.title?.trim();

    if (!trimmedTitle) {
      throw new Error('Task title cannot be empty');
    }

    const now = new Date();

    return new Task({
      id: randomUUID(),
      title: trimmedTitle,
      description: props.description?.trim() ?? null,
      position: 0,
      boardId: props.boardId,
      priority: props.priority ?? 3,
      approvalStatus: ApprovalStatus.PENDING,
      listId: props.listId,
      creatorId: props.creatorId,
      assigneeId: props.assigneeId ?? null,
      dueDate: props.dueDate ?? null,
      createdAt: now,
      updatedAt: now,
    });
  }

  static restore(props: TaskProps) {
    return new Task(props);
  }

  public rename(title: string) {
    const trimmedTitle = title?.trim();

    if (!trimmedTitle) {
      throw new Error('Task title cannot be empty');
    }

    this.props.title = trimmedTitle;
    this.touch();
  }

  public changeDescription(description: string | null) {
    this.props.description = description?.trim() ?? null;
    this.touch();
  }

  public changePriority(priority: number) {
    this.props.priority = priority;
    this.touch();
  }

  public changeApprovalStatus(status: ApprovalStatus) {
    this.props.approvalStatus = status;
    this.touch();
  }

  public reposition(position: number) {
    this.props.position = position;
    this.touch();
  }

  public assign(assigneeId: string) {
    this.props.assigneeId = assigneeId;
    this.touch();
  }

  public unassign() {
    this.props.assigneeId = null;
    this.touch();
  }

  public setDueDate(dueDate: Date | null) {
    this.props.dueDate = dueDate;
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

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get position() {
    return this.props.position;
  }

  get priority() {
    return this.props.priority;
  }

  get approvalStatus() {
    return this.props.approvalStatus;
  }

  get listId() {
    return this.props.listId;
  }

  get boardId() {
    return this.props.boardId;
  }

  get creatorId() {
    return this.props.creatorId;
  }

  get assigneeId() {
    return this.props.assigneeId;
  }

  get dueDate() {
    return this.props.dueDate;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
