import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ListModel } from '../domain/model/list.model';
import {
  type IListRepository,
  LIST_REPOSITORY,
} from '../domain/types/list.repository.interface';
import { CreateListDto } from '../dto/create-list.dto';
import { UpdateListDto } from '../dto/update-list.dto';
import { ListMapper } from '../infrastructure/mapper/list.mapper';

@Injectable()
export class ListService {
  constructor(
    @Inject(LIST_REPOSITORY) private listRepository: IListRepository,
  ) {}

  async findByListId(boardId: string) {
    const lists = await this.listRepository.findByBoardId(boardId);
    return lists.map((list) => ListMapper.toResponse(list));
  }

  async createList(boardId: string, body: CreateListDto) {
    const list = ListModel.create({ name: body.name, boardId });
    await this.listRepository.create(list);
  }

  async updateList(listId: string, body: UpdateListDto) {
    try {
      await this.listRepository.update(listId, { name: body.name });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error?.code === 'P2025') {
          throw new NotFoundException(`List with ID "${listId}" not found`);
        }
      }
      throw error;
    }
  }

  async deleteList(listId: string) {
    try {
      await this.listRepository.delete(listId);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error?.code === 'P2025') {
          throw new NotFoundException(`List with ID "${listId}" not found`);
        }
      }
      throw error;
    }
  }
}
