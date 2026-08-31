import { Inject, Injectable } from '@nestjs/common';
import {
  type ITagRepository,
  TAG_REPOSITORY,
} from '../domain/types/tag.repository.interface';
import { CreateTagDto } from '../dto/create-tag.dto';
import { TagModel } from '../domain/model/tag.model';

@Injectable()
export class TagService {
  constructor(
    @Inject(TAG_REPOSITORY) private readonly tagRepository: ITagRepository,
  ) {}

  async findAllByWorkspace(workspaceId: string) {
    return this.tagRepository.findAllByWorkspace(workspaceId);
  }

  async findById(tagId: string) {
    return this.tagRepository.findById(tagId);
  }

  async create(body: CreateTagDto) {
    const tag = TagModel.create(body);

    return this.tagRepository.create(tag);
  }
}
