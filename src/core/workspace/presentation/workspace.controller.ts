import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators';
import { type JwtPayload } from 'src/common/types';
import { WorkspaceService } from '../app/workspace.service';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { GenerateImageUrlDto } from '../dto/generate-image-url.dto';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get()
  async findAll(
    @CurrentUser() payload: JwtPayload,
    @Query('name') name?: string,
  ) {
    return this.workspaceService.getAllWorkspaces(payload.sub, name);
  }

  @Get(':workspaceId')
  async findById(
    @Param('workspaceId') workspaceId: string,
    @CurrentUser() payload: JwtPayload,
  ) {
    return this.workspaceService.getWorkspaceById(workspaceId, payload.sub);
  }

  @Post()
  async create(
    @Body() body: CreateWorkspaceDto,
    @CurrentUser() payload: JwtPayload,
  ) {
    return this.workspaceService.create(body, payload.sub);
  }

  @Post('image/url')
  async generateImageUrl(@Body() body: GenerateImageUrlDto) {
    return this.workspaceService.generateWorkspaceImageUrl(
      body.originalName,
      body.contentType,
    );
  }

  @Delete(':id')
  async delete(
    @Param('id') teamId: string,
    @CurrentUser() payload: JwtPayload,
  ) {
    return this.workspaceService.delete(teamId, payload.sub);
  }
}
