import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { ListModel } from '../../domain/model/list.model';
import { IListRepository } from '../../domain/types/list.repository.interface';
import { ListMapper } from '../mapper/list.mapper';

@Injectable()
export class ListRepository implements IListRepository {
  constructor(private readonly db: PrismaService) {}

  findAll(boardId: string) {
    return this.db.list
      .findMany({ where: { boardId } })
      .then((lists) => lists.map((list) => ListMapper.toDomain(list)));
  }

  findById(listId: string) {
    return this.db.list
      .findUniqueOrThrow({ where: { id: listId } })
      .then((list) => ListMapper.toDomain(list));
  }

  create(list: ListModel) {
    const data = ListMapper.toPersistence(list);
    return this.db.list.create({ data }).then(() => undefined);
  }

  update(list: ListModel) {
    const data = ListMapper.toPersistence(list);
    return this.db.list
      .update({ where: { id: list.id }, data })
      .then(() => undefined);
  }

  delete(listId: string) {
    return this.db.list.delete({ where: { id: listId } }).then(() => undefined);
  }
}
