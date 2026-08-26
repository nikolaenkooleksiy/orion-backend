import { Board as PrismaBoard } from '@prisma/client';
import { BoardModel } from '../../domain/model/board.model';

export class BoardMapper {
  static toDomain(board: PrismaBoard) {
    return BoardModel.restore({ ...board });
  }

  static toPersistence(board: BoardModel) {
    return {
      id: board.id,
      name: board.name,
      projectId: board.projectId,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
    };
  }
}
