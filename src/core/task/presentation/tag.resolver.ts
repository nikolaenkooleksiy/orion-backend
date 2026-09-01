import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { TagService } from '../app/tag.service';
import { CreateTagDto } from '../dto/create-tag.dto';
import { TagResponseDto } from '../dto/tag-response.dto';

@Resolver(() => TagResponseDto)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query(() => [TagResponseDto], {
    name: 'workspace_tags',
  })
  async findAllByWorkspace(workspaceId: string) {
    return this.tagService.findAllByWorkspace(workspaceId);
  }

  @Mutation(() => TagResponseDto, {
    name: 'create_tag',
  })
  async create(@Args('body') body: CreateTagDto) {
    return this.tagService.create(body);
  }

  @Mutation(() => SuccessResponseDto, {
    name: 'delete_tag',
  })
  async delete(@Args('tagId') tagId: string) {
    return this.tagService.delete(tagId);
  }
}
