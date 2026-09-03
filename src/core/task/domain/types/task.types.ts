import { ApprovalStatus } from '@prisma/client';

export interface CreateTaskProps {
  title: string;
  description?: string | null;
  listId: string;
  boardId: string;
  creatorId: string;
  priority?: number;
  assigneeId?: string | null;
  dueDate?: Date | null;
}

export interface TaskProps {
  id: string;
  title: string;
  description: string | null;
  position: number;
  priority: number;
  boardId: string;
  approvalStatus: ApprovalStatus;
  listId: string;
  creatorId: string;
  assigneeId: string | null;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
