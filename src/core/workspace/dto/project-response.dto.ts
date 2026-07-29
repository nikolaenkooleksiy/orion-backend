export class ProjectResponseDto {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  isFavorite: boolean;
  color: string;
}
