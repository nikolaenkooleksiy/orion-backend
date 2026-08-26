import { Injectable } from '@nestjs/common';
import { ListModel } from '../../domain/model/list.model';
import { IListRepository } from '../../domain/types/list.repository.interface';

@Injectable()
export class InMemoryListRepository implements IListRepository {
  private readonly lists = new Map<string, ListModel>();

  findAll(boardId: string) {
    return Promise.resolve(
      Array.from(this.lists.values()).filter(
        (list) => list.boardId === boardId,
      ),
    );
  }

  findById(listId: string) {
    const list = this.lists.get(listId);
    if (!list) return Promise.reject(new Error('List not found'));
    return Promise.resolve(list);
  }

  create(list: ListModel) {
    this.lists.set(list.id, list);
    return Promise.resolve();
  }

  update(list: ListModel) {
    this.lists.set(list.id, list);
    return Promise.resolve();
  }

  delete(listId: string) {
    this.lists.delete(listId);
    return Promise.resolve();
  }
}
