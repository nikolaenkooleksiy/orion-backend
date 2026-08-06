import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ListService } from '../app/list.service';
import { CreateListDto } from '../dto/create-list.dto';
import { UpdateListDto } from '../dto/update-list.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get('/board/:boardId')
  async findByListId(boardId: string) {
    return this.listService.findByListId(boardId);
  }

  @Post('/board/:boardId')
  async createList(boardId: string, body: CreateListDto) {
    return this.listService.createList(boardId, body);
  }

  @Patch('/board/:listId')
  async updateList(listId: string, body: UpdateListDto) {
    return this.listService.updateList(listId, body);
  }

  @Delete('/board/:listId')
  async deleteList(listId: string) {
    return this.listService.deleteList(listId);
  }
}
