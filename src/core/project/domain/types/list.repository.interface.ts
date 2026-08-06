import { ListModel, ListProps } from '../model/list.model';

export const LIST_REPOSITORY = Symbol('LIST_REPOSITORY');

export interface IListRepository {
  findByBoardId(boardId: string): Promise<ListModel[]>;

  create(list: ListModel): Promise<void>;
  update(id: string, data: Partial<ListProps>): Promise<void>;

  delete(id: string): Promise<void>;
}
