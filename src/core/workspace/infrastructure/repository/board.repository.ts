import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { BoardModel } from '../../domain/model/board.model';
import { type IBoardRepository } from '../../domain/types/board.repository.interface';
import { BoardMapper } from '../mapper/board.mapper';

@Injectable()
export class BoardRepository implements IBoardRepository {
  constructor(private readonly db: PrismaService) {}

  async findByProjectId(projectId: string): Promise<BoardModel[]> {
    const boards = await this.db.board.findMany({
      where: { projectId },
    });

    return boards.map((board) => BoardMapper.toDomain(board));
  }

  async create(board: BoardModel): Promise<BoardModel> {
    const data = BoardMapper.toPersistence(board);

    const newBoard = await this.db.board.create({
      data: {
        ...data,
        projectId: board.projectId,
      },
    });

    return BoardMapper.toDomain(newBoard);
  }

  async delete(boardId: string): Promise<void> {
    await this.db.board.delete({
      where: { id: boardId },
    });
  }
}
