import { TagModel } from '../model/tag.model';

export const TAG_REPOSITORY = Symbol('TAG_REPOSITORY');

export interface ITagRepository {
  findAllByWorkspace: (workspaceId: string) => Promise<TagModel[]>;
  findById: (tagId: string) => Promise<TagModel>;
  create: (tag: TagModel) => Promise<TagModel>;
  update: (tag: TagModel) => Promise<TagModel>;
  delete: (tagId: string) => Promise<void>;
}
