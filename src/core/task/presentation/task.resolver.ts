import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { type JwtPayload } from 'src/common/types';
import { TaskService } from '../app/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskResponseDto } from '../dto/task-response.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Resolver(() => TaskResponseDto)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [TaskResponseDto], {
    name: 'find_tasks_by_list',
  })
  async findAllByList(@Args('listId') listId: string) {
    return this.taskService.findAllByList(listId);
  }

  @Query(() => TaskResponseDto, {
    name: 'find_task_by_id',
  })
  async findById(@Args('taskId') taskId: string) {
    return this.taskService.findById(taskId);
  }

  @Mutation(() => TaskResponseDto, {
    name: 'create_task',
  })
  async create(
    @Args('body') body: CreateTaskDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.taskService.create(body, user.sub);
  }

  @Mutation(() => TaskResponseDto, {
    name: 'update_task',
  })
  async update(
    @Args('taskId') taskId: string,
    @Args('body') body: UpdateTaskDto,
  ) {
    return this.taskService.update(taskId, body);
  }

  @Mutation(() => SuccessResponseDto, {
    name: 'delete_task',
  })
  async delete(@Args('taskId') taskId: string) {
    return this.taskService.delete(taskId);
  }
}
