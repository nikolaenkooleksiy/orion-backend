import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { BoardService } from '../app/board.service';
import { ListService } from '../app/list.service';
import { BoardResponseDto } from '../dto/board-response.dto';
import { CreateBoardDto } from '../dto/create-board.dto';
import { ListResponseDto } from '../dto/list-response.dto';

@Resolver(() => BoardResponseDto)
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService,
    private readonly listService: ListService,
  ) {}

  @ResolveField('lists', () => [ListResponseDto], { nullable: true })
  getLists(@Parent() board: BoardResponseDto) {
    return this.listService.findByBoardId(board.id);
  }

  @Query(() => [BoardResponseDto], { name: 'find_boards_by_project' })
  findBoardsByProject(@Args('projectId') projectId: string) {
    return this.boardService.findByProjectId(projectId);
  }

  @Mutation(() => BoardResponseDto, { name: 'create_board' })
  createBoard(@Args('body') body: CreateBoardDto) {
    return this.boardService.create(body);
  }

  @Mutation(() => SuccessResponseDto, { name: 'delete_board' })
  async deleteBoard(@Args('boardId') boardId: string) {
    await this.boardService.delete(boardId);
    return { isSuccessful: true };
  }
}
