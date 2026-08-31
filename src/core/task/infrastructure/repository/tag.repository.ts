import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { TagModel } from '../../domain/model/tag.model';
import { ITagRepository } from '../../domain/types/tag.repository.interface';
import { TagMapper } from '../mapper/tag.mapper';

@Injectable()
export class TagRepository implements ITagRepository {
  constructor(private readonly db: PrismaService) {}

  async findAllByWorkspace(workspaceId: string) {
    const tags = await this.db.tag.findMany({
      where: {
        workspaceId,
      },
    });

    return tags.map((tag) => TagMapper.toDomain(tag));
  }

  async findById(tagId: string) {
    const tag = await this.db.tag.findUniqueOrThrow({
      where: {
        id: tagId,
      },
    });

    return TagMapper.toDomain(tag);
  }

  async create(tag: TagModel) {
    const data = TagMapper.toPersistence(tag);

    const newTag = await this.db.tag.create({
      data,
    });

    return TagMapper.toDomain(newTag);
  }

  async update(tag: TagModel) {
    const data = TagMapper.toPersistence(tag);

    const updatedTag = await this.db.tag.update({
      where: {
        id: tag.id,
      },
      data,
    });

    return TagMapper.toDomain(updatedTag);
  }

  async delete(tagId: string) {
    await this.db.tag.delete({
      where: {
        id: tagId,
      },
    });
  }
}
