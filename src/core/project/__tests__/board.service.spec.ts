import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from '../app/board.service';
import { BOARD_REPOSITORY } from '../domain/types/board.repository.interface';
import { InMemoryBoardRepository } from '../infrastructure/repository/in-memory.board.repository';

const mockProjectId = 'project-1';

const mockCreateDto = {
  name: 'Test Board',
  projectId: mockProjectId,
};

describe('BoardService', () => {
  let service: BoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: BOARD_REPOSITORY,
          useClass: InMemoryBoardRepository,
        },
      ],
    }).compile();

    service = module.get<BoardService>(BoardService);
  });

  describe('create', () => {
    it('should create a board and return it', async () => {
      const board = await service.create(mockCreateDto);

      expect(board).toBeDefined();
      expect(board.id).toBeDefined();
      expect(board.name).toBe(mockCreateDto.name);
      expect(board.projectId).toBe(mockCreateDto.projectId);
    });
  });

  describe('findByProjectId', () => {
    it('should return boards for a project', async () => {
      await service.create(mockCreateDto);
      await service.create({ ...mockCreateDto, name: 'Board 2' });

      const boards = await service.findByProjectId(mockProjectId);

      expect(boards).toHaveLength(2);
    });

    it('should not return boards from other projects', async () => {
      await service.create(mockCreateDto);
      await service.create({
        ...mockCreateDto,
        name: 'Other Board',
        projectId: 'other-project',
      });

      const boards = await service.findByProjectId(mockProjectId);

      expect(boards).toHaveLength(1);
      expect(boards[0].name).toBe(mockCreateDto.name);
    });
  });

  describe('delete', () => {
    it('should delete a board', async () => {
      const created = await service.create(mockCreateDto);
      await service.delete(created.id);

      const boards = await service.findByProjectId(mockProjectId);
      expect(boards).toHaveLength(0);
    });
  });
});
