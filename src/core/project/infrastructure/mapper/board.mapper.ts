import { Board as PrismaBoard } from '@prisma/client';
import { BoardModel } from '../../domain/model/board.model';
import { BoardResponseDto } from '../../dto/board-response.dto';

export class BoardMapper {
  static toDomain(board: PrismaBoard): BoardModel {
    return BoardModel.restore({ ...board });
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

  static toResponse(board: BoardModel): BoardResponseDto {
    return {
      id: board.id,
      name: board.name,
      createdAt: board.createdAt,
    };
  }
}
