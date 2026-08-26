import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from '../app/project.service';
import { PROJECT_REPOSITORY } from '../domain/types/project.repository.interface';
import { InMemoryProjectRepository } from '../infrastructure/repository/in-memory.project.repository';

const mockWorkspaceId = 'workspace-1';
const mockUserId = 'user-1';

const mockCreateDto = {
  name: 'Test Project',
  description: 'A test project',
  workspaceId: mockWorkspaceId,
};

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: PROJECT_REPOSITORY,
          useClass: InMemoryProjectRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  describe('create', () => {
    it('should create a project and return it', async () => {
      const project = await service.create(mockCreateDto);

      expect(project).toBeDefined();
      expect(project.id).toBeDefined();
      expect(project.name).toBe(mockCreateDto.name);
      expect(project.description).toBe(mockCreateDto.description);
      expect(project.workspaceId).toBe(mockCreateDto.workspaceId);
    });
  });

  describe('findAll', () => {
    it('should return projects for a workspace', async () => {
      await service.create(mockCreateDto);
      await service.create({ ...mockCreateDto, name: 'Project 2' });

      const projects = await service.findAll(mockWorkspaceId, mockUserId);

      expect(projects).toHaveLength(2);
    });

    it('should not return projects from other workspaces', async () => {
      await service.create(mockCreateDto);
      await service.create({
        ...mockCreateDto,
        name: 'Other Project',
        workspaceId: 'other-workspace',
      });

      const projects = await service.findAll(mockWorkspaceId, mockUserId);

      expect(projects).toHaveLength(1);
      expect(projects[0].name).toBe(mockCreateDto.name);
    });
  });

  describe('findById', () => {
    it('should return a project by id', async () => {
      const created = await service.create(mockCreateDto);
      const found = await service.findById(
        mockWorkspaceId,
        created.id,
        mockUserId,
      );

      expect(found.id).toBe(created.id);
      expect(found.name).toBe(mockCreateDto.name);
    });

    it('should throw when project not found', async () => {
      await expect(
        service.findById(mockWorkspaceId, 'non-existent', mockUserId),
      ).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update project name', async () => {
      const created = await service.create(mockCreateDto);
      const updated = await service.update(
        mockWorkspaceId,
        created.id,
        mockUserId,
        { name: 'Updated Name' },
      );

      expect(updated.name).toBe('Updated Name');
    });

    it('should update project description', async () => {
      const created = await service.create(mockCreateDto);
      const updated = await service.update(
        mockWorkspaceId,
        created.id,
        mockUserId,
        { description: 'New description' },
      );

      expect(updated.description).toBe('New description');
    });

    it('should update project color', async () => {
      const created = await service.create(mockCreateDto);
      const updated = await service.update(
        mockWorkspaceId,
        created.id,
        mockUserId,
        { color: 'bg-red-500' },
      );

      expect(updated.color).toBe('bg-red-500');
    });

    it('should throw when project not found', async () => {
      await expect(
        service.update(mockWorkspaceId, 'non-existent', mockUserId, {
          name: 'Updated',
        }),
      ).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should delete a project', async () => {
      const created = await service.create(mockCreateDto);
      await service.delete(created.id, mockUserId);

      const projects = await service.findAll(mockWorkspaceId, mockUserId);
      expect(projects).toHaveLength(0);
    });

    it('should return isSuccessful: true', async () => {
      const created = await service.create(mockCreateDto);
      const result = await service.delete(created.id, mockUserId);

      expect(result).toEqual({ isSuccessful: true });
    });
  });

  describe('toggleFavorite', () => {
    it('should not throw', async () => {
      const created = await service.create(mockCreateDto);
      await service.toggleFavorite(created.id, mockUserId);
    });
  });
});
