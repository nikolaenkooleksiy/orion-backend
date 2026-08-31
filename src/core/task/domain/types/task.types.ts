export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum TaskApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface CreateTaskProps {
  title: string;
  description?: string | null;
  listId: string;
  boardId: string;
  creatorId: string;
  priority?: TaskPriority;
  assigneeId?: string | null;
  dueDate?: Date | null;
}

export interface TaskProps {
  id: string;
  title: string;
  description: string | null;
  position: number;
  priority: TaskPriority;
  boardId: string;
  approvalStatus: TaskApprovalStatus;
  listId: string;
  creatorId: string;
  assigneeId: string | null;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
