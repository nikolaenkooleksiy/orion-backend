import { Board as PrismaBoard } from '@prisma/client';
import { BoardModel } from '../../domain/model/board.model';

export class BoardMapper {
  static toDomain(board: PrismaBoard): BoardModel {
    return BoardModel.create({ ...board });
  }

  static toPersistence(board: BoardModel): PrismaBoard {
    return {
      id: board.id,
      name: board.name,
      projectId: board.projectId,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
    };
  }
}
