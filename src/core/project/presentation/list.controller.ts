import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ListService } from '../app/list.service';
import { CreateListDto } from '../dto/create-list.dto';
import { UpdateListDto } from '../dto/update-list.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get(':boardId')
  async findByListId(@Param('boardId') boardId: string) {
    return this.listService.findByListId(boardId);
  }

  @Post(':boardId')
  async createList(@Param('boardId') boardId: string, body: CreateListDto) {
    return this.listService.createList(boardId, body);
  }

  @Patch(':listId')
  async updateList(@Param('listId') listId: string, body: UpdateListDto) {
    return this.listService.updateList(listId, body);
  }

  @Delete(':listId')
  async deleteList(@Param('listId') listId: string) {
    return this.listService.deleteList(listId);
  }
}
