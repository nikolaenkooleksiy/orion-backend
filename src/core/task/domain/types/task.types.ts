import { ApprovalStatus } from '@prisma/client';

export interface CreateTaskProps {
  title: string;
  description?: string | null;
  listId: string;
  creatorId: string;
  priority?: number;
  assigneeId?: string | null;
  dueDate?: Date | null;
  tagIds?: string[];
}

export interface TaskProps {
  id: string;
  title: string;
  description: string | null;
  position: number;
  priority: number;
  approvalStatus: ApprovalStatus;
  listId: string;
  creatorId: string;
  assigneeId: string | null;
  dueDate: Date | null;
  tagIds: string[];
  createdAt: Date;
  updatedAt: Date;
}
