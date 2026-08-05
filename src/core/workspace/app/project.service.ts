import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { StorageService } from 'src/infrastructure/storage/storage.service';
import { BoardModel } from '../domain/model/board.model';
import { Project } from '../domain/model/project.model';
import {
  BOARD_REPOSITORY,
  type IBoardRepository,
} from '../domain/types/board.repository.interface';
import {
  type IProjectRepository,
  PROJECT_REPOSITORY,
} from '../domain/types/project.repository.interface';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { BoardMapper } from '../infrastructure/mapper/board.mapper';
import { ProjectMapper } from '../infrastructure/mapper/project.mapper';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
    @Inject(BOARD_REPOSITORY)
    private readonly boardRepository: IBoardRepository,

    private readonly storageService: StorageService,
  ) {}

  async findAll(teamId: string, userId: string) {
    const projects = await this.projectRepository.findAll(teamId, userId);

    return projects.map((project) => ProjectMapper.toResponse(project));
  }

  async create(dto: CreateProjectDto) {
    try {
      const project = Project.create({ ...dto, color: 'bg-blue-500' });

      const created = await this.projectRepository.create(project);

      const defaultBoardName = dto.boardName ?? 'Default Board';

      await this.boardRepository.create(
        BoardModel.create({
          name: defaultBoardName,
          projectId: created.id,
        }),
      );

      return ProjectMapper.toResponse(created);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Project with this name already exists');
      }
      throw error;
    }
  }

  async update(projectId: string, project: UpdateProjectDto) {
    try {
      const updated = await this.projectRepository.update(projectId, project);

      if (!updated) {
        throw new NotFoundException('Project not found');
      }

      return ProjectMapper.toResponse(updated);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Project not found');
        }
        if (error.code === 'P2002') {
          throw new ConflictException('Project with this name already exists');
        }
      }
      throw error;
    }
  }

  async delete(projectId: string, userId: string) {
    try {
      await this.projectRepository.delete(projectId, userId);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Project not found');
      }
      throw error;
    }
  }

  async addToFavorites(projectId: string, userId: string) {
    try {
      return await this.projectRepository.addToFavorites(projectId, userId);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Project not found');
      }
      throw error;
    }
  }

  async getProjectBoards(projectId: string) {
    try {
      const boards = await this.boardRepository.findByProjectId(projectId);
      return boards.map((board) => BoardMapper.toResponse(board));
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Project not found');
      }
      throw error;
    }
  }
}
