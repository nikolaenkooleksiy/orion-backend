import { BoardModel } from '../model/board.model';

export const BOARD_REPOSITORY = Symbol('BOARD_REPOSITORY');

export interface IBoardRepository {
  findAllProjectBoards: (projectId: string) => Promise<BoardModel[]>;
  create: (board: BoardModel) => Promise<BoardModel>;
  delete: (boardId: string) => Promise<void>;
}
