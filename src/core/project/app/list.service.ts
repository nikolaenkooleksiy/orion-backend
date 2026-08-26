import { Inject, Injectable } from '@nestjs/common';
import { ListModel } from '../domain/model/list.model';
import {
  type IListRepository,
  LIST_REPOSITORY,
} from '../domain/types/list.repository.interface';
import { CreateListDto } from '../dto/create-list.dto';
import { UpdateListDto } from '../dto/update-list.dto';

@Injectable()
export class ListService {
  constructor(
    @Inject(LIST_REPOSITORY) private listRepository: IListRepository,
  ) {}

  findByBoardId(boardId: string): Promise<ListModel[]> {
    return this.listRepository.findAll(boardId);
  }

  findById(listId: string): Promise<ListModel> {
    return this.listRepository.findById(listId);
  }

  create(body: CreateListDto): Promise<ListModel> {
    const list = ListModel.create({ name: body.name, boardId: body.boardId });
    return this.listRepository.create(list).then(() => list);
  }

  update(listId: string, body: UpdateListDto): Promise<ListModel> {
    return this.listRepository.findById(listId).then((list) => {
      if (body.name !== undefined) list.rename(body.name);
      return this.listRepository.update(list).then(() => list);
    });
  }

  delete(listId: string): Promise<void> {
    return this.listRepository.delete(listId);
  }
}
