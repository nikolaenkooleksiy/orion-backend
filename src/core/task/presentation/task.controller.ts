import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskService } from '../app/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':boardId')
  getAllTasks(@Param('boardId') boardId: string) {
    return this.taskService.getAllTasks(boardId);
  }

  @Post()
  createTask(@Body() body: CreateTaskDto) {
    return this.taskService.createTask(body);
  }
}
