import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { ListModel, ListProps } from '../../domain/model/list.model';
import { IListRepository } from '../../domain/types/list.repository.interface';
import { ListMapper } from '../mapper/list.mapper';

@Injectable()
export class ListRepository implements IListRepository {
  constructor(private readonly db: PrismaService) {}

  async findByBoardId(boardId: string): Promise<ListModel[]> {
    const lists = await this.db.list.findMany({
      where: { boardId },
    });

    return lists.map((list) => ListMapper.toDomain(list));
  }

  async create(list: ListModel): Promise<void> {
    const data = ListMapper.toPersistence(list);

    await this.db.list.create({ data });
  }

  async update(id: string, data: Partial<ListProps>): Promise<void> {
    await this.db.list.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.db.list.delete({ where: { id } });
  }
}
