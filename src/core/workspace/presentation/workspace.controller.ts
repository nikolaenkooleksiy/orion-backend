import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators';
import { type JwtPayload } from 'src/common/types';
import { WorkspaceService } from '../app/workspace.service';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { GenerateImageUrlDto } from '../dto/generate-image-url.dto';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get()
  async findAll(@CurrentUser() payload: JwtPayload) {
    return this.workspaceService.getAllWorkspaces(payload.sub);
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
