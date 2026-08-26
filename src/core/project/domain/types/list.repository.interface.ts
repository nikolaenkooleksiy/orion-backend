import { ListModel } from '../model/list.model';

export const LIST_REPOSITORY = Symbol('LIST_REPOSITORY');

export interface IListRepository {
  findAll: (boardId: string) => Promise<ListModel[]>;
  findById: (listId: string) => Promise<ListModel>;
  create: (list: ListModel) => Promise<void>;
  update: (list: ListModel) => Promise<void>;
  delete: (listId: string) => Promise<void>;
}
