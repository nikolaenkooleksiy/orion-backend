import { Prisma, Tag } from '@prisma/client';
import { TagModel } from '../../domain/model/tag.model';

export class TagMapper {
  static toDomain(tag: Tag): TagModel {
    return TagModel.create({ ...tag });
  }

  static toPersistence(tagModel: TagModel): Prisma.TagUncheckedCreateInput {
    return {
      id: tagModel.id,
      name: tagModel.name,
      color: tagModel.color,
      workspaceId: tagModel.workspaceId,
      createdAt: tagModel.createdAt,
      updatedAt: tagModel.updatedAt,
    };
  }
}
