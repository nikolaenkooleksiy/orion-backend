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

  async findByListId(boardId: string) {
    return await this.listRepository.findByBoardId(boardId);
  }

  async createList(boardId: string, body: CreateListDto) {
    const list = ListModel.create({ name: body.name, boardId });
    await this.listRepository.create(list);
  }

  async updateList(listId: string, body: UpdateListDto) {
    await this.listRepository.update(listId, { name: body.name });
  }

  async deleteList(listId: string) {
    await this.listRepository.delete(listId);
  }
}
