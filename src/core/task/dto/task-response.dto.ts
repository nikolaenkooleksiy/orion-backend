export class TaskResponseDto {
  id: string;
  title: string;
  description: string | null;
  position: number;
  createdAt: Date;
}
