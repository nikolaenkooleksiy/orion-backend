export interface TagProps {
  id: string;
  name: string;
  color: string;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTagProps {
  name: string;
  color: string;
  workspaceId: string;
}
