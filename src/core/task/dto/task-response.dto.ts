import { TaskApprovalStatus } from '@prisma/client';

export class TaskResponseDto {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  approvalStatus: TaskApprovalStatus;
  createdBy: string;
  position: number;
  dueDate: Date | null;
  createdAt: Date;
}
