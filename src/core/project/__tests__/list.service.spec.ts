import { Test, TestingModule } from '@nestjs/testing';
import { ListService } from '../app/list.service';
import { ListModel } from '../domain/model/list.model';
import { LIST_REPOSITORY } from '../domain/types/list.repository.interface';
import { InMemoryListRepository } from '../infrastructure/repository/in-memory.list.repository';

const mockBoardId = 'board-1';

const mockCreateDto = {
  name: 'Test List',
  boardId: mockBoardId,
};

describe('ListService', () => {
  let service: ListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListService,
        {
          provide: LIST_REPOSITORY,
          useClass: InMemoryListRepository,
        },
      ],
    }).compile();

    service = module.get<ListService>(ListService);
  });

  describe('create', () => {
    it('should create a list and return it', async () => {
      const list: ListModel = await service.create(mockCreateDto);

      expect(list).toBeDefined();
      expect(list.id).toBeDefined();
      expect(list.name).toBe(mockCreateDto.name);
      expect(list.boardId).toBe(mockCreateDto.boardId);
    });
  });

  describe('findByBoardId', () => {
    it('should return lists for a board', async () => {
      await service.create(mockCreateDto);
      await service.create({ ...mockCreateDto, name: 'List 2' });

      const lists: ListModel[] = await service.findByBoardId(mockBoardId);

      expect(lists).toHaveLength(2);
    });

    it('should not return lists from other boards', async () => {
      await service.create(mockCreateDto);
      await service.create({
        ...mockCreateDto,
        name: 'Other List',
        boardId: 'other-board',
      });

      const lists: ListModel[] = await service.findByBoardId(mockBoardId);

      expect(lists).toHaveLength(1);
      expect(lists[0].name).toBe(mockCreateDto.name);
    });
  });

  describe('findById', () => {
    it('should return a list by id', async () => {
      const created: ListModel = await service.create(mockCreateDto);
      const found: ListModel = await service.findById(created.id);

      expect(found.id).toBe(created.id);
      expect(found.name).toBe(mockCreateDto.name);
    });

    it('should throw when list not found', async () => {
      await expect(service.findById('non-existent')).rejects.toThrow(
        'List not found',
      );
    });
  });

  describe('update', () => {
    it('should update list name', async () => {
      const created: ListModel = await service.create(mockCreateDto);
      const updated: ListModel = await service.update(created.id, {
        name: 'Updated List',
      });

      expect(updated.name).toBe('Updated List');
    });

    it('should throw when list not found', async () => {
      await expect(
        service.update('non-existent', { name: 'Updated' }),
      ).rejects.toThrow('List not found');
    });
  });

  describe('delete', () => {
    it('should delete a list', async () => {
      const created: ListModel = await service.create(mockCreateDto);
      await service.delete(created.id);

      const lists: ListModel[] = await service.findByBoardId(mockBoardId);
      expect(lists).toHaveLength(0);
    });
  });
});
