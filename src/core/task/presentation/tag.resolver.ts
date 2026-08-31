import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TagService } from '../app/tag.service';
import { TagResponseDto } from '../dto/tag-response.dto';
import { CreateTagDto } from '../dto/create-tag.dto';

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
}
