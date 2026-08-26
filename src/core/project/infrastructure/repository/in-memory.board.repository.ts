import { Injectable } from '@nestjs/common';
import { BoardModel } from '../../domain/model/board.model';
import { IBoardRepository } from '../../domain/types/board.repository.interface';

@Injectable()
export class InMemoryBoardRepository implements IBoardRepository {
  private readonly boards = new Map<string, BoardModel>();

  findAllProjectBoards(projectId: string): Promise<BoardModel[]> {
    return Promise.resolve(
      Array.from(this.boards.values()).filter(
        (board) => board.projectId === projectId,
      ),
    );
  }

  create(board: BoardModel): Promise<BoardModel> {
    this.boards.set(board.id, board);
    return Promise.resolve(board);
  }

  delete(boardId: string): Promise<void> {
    this.boards.delete(boardId);
    return Promise.resolve();
  }
}
