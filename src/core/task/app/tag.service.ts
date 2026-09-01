import { Inject, Injectable, Logger } from '@nestjs/common';
import { TagModel } from '../domain/model/tag.model';
import {
  type ITagRepository,
  TAG_REPOSITORY,
} from '../domain/types/tag.repository.interface';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';

@Injectable()
export class TagService {
  private readonly logger = new Logger(TagService.name);

  constructor(
    @Inject(TAG_REPOSITORY) private readonly tagRepository: ITagRepository,
  ) {}

  async findAllByWorkspace(workspaceId: string) {
    this.logger.log(`Finding tags for workspace: ${workspaceId}`);

    return this.tagRepository.findAllByWorkspace(workspaceId);
  }

  async findById(tagId: string) {
    this.logger.log(`Finding tag: ${tagId}`);

    return this.tagRepository.findById(tagId);
  }

  async create(body: CreateTagDto) {
    this.logger.log(`Creating tag: ${body.name}`);

    const tag = TagModel.create(body);

    const result = await this.tagRepository.create(tag);

    this.logger.log(`Tag created: ${result.id}`);

    return result;
  }

  async update(tagId: string, body: UpdateTagDto) {
    this.logger.log(`Updating tag: ${tagId}`);

    const tag = await this.tagRepository.findById(tagId);

    if (body.name !== undefined) tag.rename(body.name);

    if (body.color !== undefined) tag.changeColor(body.color);

    const result = await this.tagRepository.update(tag);

    this.logger.log(`Tag updated: ${result.id}`);

    return result;
  }

  async delete(tagId: string) {
    this.logger.log(`Deleting tag: ${tagId}`);

    await this.tagRepository.delete(tagId);

    this.logger.log(`Tag deleted: ${tagId}`);

    return {
      isSuccessful: true,
    };
  }
}
