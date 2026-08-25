import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { BoardService } from '../app/board.service';
import { BoardResponseDto } from '../dto/board-response.dto';
import { CreateBoardDto } from '../dto/create-board.dto';

@Resolver(() => BoardResponseDto)
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Mutation(() => BoardResponseDto, { name: 'create_board' })
  async createBoard(@Args('body') body: CreateBoardDto) {
    return this.boardService.create(body);
  }

  @Mutation(() => SuccessResponseDto, { name: 'delete_board' })
  async deleteBoard(@Args('boardId') boardId: string) {
    await this.boardService.delete(boardId);
    return { isSuccessful: true };
  }
}
