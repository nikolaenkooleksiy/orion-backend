import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators';
import { type JwtPayload } from 'src/common/types';
import { ProjectService } from '../app/project.service';
import { CreateBoardDto } from '../dto/create-board.dto';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':teamId')
  async findAll(
    @Param('teamId') teamId: string,
    @CurrentUser() payload: JwtPayload,
  ) {
    return this.projectService.findAll(teamId, payload.sub);
  }

  @Post()
  async create(@Body() body: CreateProjectDto) {
    return this.projectService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') projectId: string, @Body() body: UpdateProjectDto) {
    return this.projectService.update(projectId, body);
  }

  @Delete(':id')
  async delete(
    @Param('id') projectId: string,
    @CurrentUser() payload: JwtPayload,
  ) {
    return this.projectService.delete(projectId, payload.sub);
  }

  @Post(':projectId/toggle-favorite')
  async addToFavorites(
    @Param('projectId') projectId: string,
    @CurrentUser() payload: JwtPayload,
  ) {
    return this.projectService.addToFavorites(projectId, payload.sub);
  }

  @Get(':projectId/boards')
  async getProjectBoards(@Param('projectId') projectId: string) {
    return this.projectService.getProjectBoards(projectId);
  }

  @Post(':projectId/boards')
  async createBoard(
    @Param('projectId') projectId: string,
    @Body() body: CreateBoardDto,
  ) {
    return this.projectService.createBoard(projectId, body);
  }
}
