import { Inject, Injectable } from '@nestjs/common';
import { BoardModel } from '../domain/model/board.model';
import {
  type IBoardRepository,
  BOARD_REPOSITORY,
} from '../domain/types/board.repository.interface';
import { CreateBoardDto } from '../dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @Inject(BOARD_REPOSITORY)
    private readonly boardRepository: IBoardRepository,
  ) {}

  async findByProjectId(projectId: string) {
    return this.boardRepository.findAllProjectBoards(projectId);
  }

  async create(body: CreateBoardDto) {
    const board = BoardModel.create({
      name: body.name,
      projectId: body.projectId,
    });

    return this.boardRepository.create(board);
  }

  async delete(boardId: string) {
    await this.boardRepository.delete(boardId);
  }
}
