import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { ListService } from '../app/list.service';
import { CreateListDto } from '../dto/create-list.dto';
import { ListResponseDto } from '../dto/list-response.dto';
import { UpdateListDto } from '../dto/update-list.dto';

@Resolver(() => ListResponseDto)
export class ListResolver {
  constructor(private readonly listService: ListService) {}

  @Mutation(() => ListResponseDto, { name: 'create_list' })
  createList(@Args('body') body: CreateListDto) {
    return this.listService.create(body);
  }

  @Mutation(() => ListResponseDto, { name: 'update_list' })
  updateList(
    @Args('listId') listId: string,
    @Args('body') body: UpdateListDto,
  ) {
    return this.listService.update(listId, body);
  }

  @Mutation(() => SuccessResponseDto, { name: 'delete_list' })
  async deleteList(@Args('listId') listId: string) {
    await this.listService.delete(listId);
    return { isSuccessful: true };
  }
}
