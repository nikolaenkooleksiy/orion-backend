import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from 'src/infrastructure/storage/storage.service';
import { WorkspaceService } from '../app/workspace.service';
import { WORKSPACE_REPOSITORY } from '../domain/types/workspace.repository.interface';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { WorkspaceInMemoryRepository } from '../infrastructure/repository/workspace.in-memory.repository';

const mockDto: CreateWorkspaceDto = {
  name: 'testworkspace',
  description: 'Test Workspace Description',
  imageKey: 'default-key',
  customUrl: 'test-workspace',
};

const mockOwnerId = 'test-owner-id';
const mockMemberId = 'test-member-id';

const mockStorageService = {
  upload: jest.fn(),
  delete: jest.fn(),
  getUrl: jest.fn(),
};

describe('WorkspaceService', () => {
  let service: WorkspaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspaceService,
        {
          provide: StorageService,
          useValue: mockStorageService,
        },
        {
          provide: WORKSPACE_REPOSITORY,
          useClass: WorkspaceInMemoryRepository,
        },
      ],
    }).compile();

    service = module.get<WorkspaceService>(WorkspaceService);

    jest.clearAllMocks();
  });

  describe('create new workspace', () => {
    it('should create workspace and return it', async () => {
      const workspace = await service.createWorkspace(mockOwnerId, mockDto);

      expect(workspace).toBeDefined();
      expect(workspace.id).toBeDefined();
      expect(workspace.name).toBe(mockDto.name);
      expect(workspace.description).toBe(mockDto.description);
      expect(workspace.customUrl).toBe(mockDto.customUrl);
    });

    it('should throw when workspace name is empty', async () => {
      await expect(
        service.createWorkspace(mockOwnerId, { ...mockDto, name: '   ' }),
      ).rejects.toThrow('Workspace name cannot be empty');
    });
  });

  describe('findAllUserWorkspaces', () => {
    it('should return only workspaces where user is a member/owner', async () => {
      const created = await service.createWorkspace(mockOwnerId, mockDto);
      await service.createWorkspace(mockMemberId, {
        ...mockDto,
        name: 'other workspace',
      });

      const workspaces = await service.findAllUserWorkspaces(mockOwnerId);

      expect(workspaces).toHaveLength(1);
      expect(workspaces[0].id).toBe(created.id);
      expect(workspaces[0].name).toBe(mockDto.name);
    });

    it('should filter workspaces by search query if name option is provided', async () => {
      await service.createWorkspace(mockOwnerId, {
        ...mockDto,
        name: 'Frontend Team',
      });
      await service.createWorkspace(mockOwnerId, {
        ...mockDto,
        name: 'Backend Team',
      });

      const filtered = await service.findAllUserWorkspaces(mockOwnerId, {
        name: 'front',
      });

      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('Frontend Team');
    });
  });

  describe('findById', () => {
    it('should return workspace by id for an authorized user', async () => {
      const created = await service.createWorkspace(mockOwnerId, mockDto);
      const found = await service.findWorkspaceById(created.id, mockOwnerId);

      expect(found).toBeDefined();
      expect(found.id).toBe(created.id);
      expect(found.name).toBe(mockDto.name);
    });

    it('should throw when workspace not found', async () => {
      await expect(
        service.findWorkspaceById('non-existent-id', mockOwnerId),
      ).rejects.toThrow('Workspace not found');
    });

    it('should throw when user has no access to workspace', async () => {
      const created = await service.createWorkspace(mockOwnerId, mockDto);

      await expect(
        service.findWorkspaceById(created.id, 'stranger-id'),
      ).rejects.toThrow('You do not have access to this workspace');
    });
  });

  describe('update', () => {
    it('should update workspace fields', async () => {
      const created = await service.createWorkspace(mockOwnerId, mockDto);
      const updated = await service.updateWorkspace(
        created.id,
        {
          name: 'newname',
          description: 'new description',
        },
        mockOwnerId,
      );

      expect(updated.name).toBe('newname');
      expect(updated.description).toBe('new description');

      const found = await service.findWorkspaceById(created.id, mockOwnerId);
      expect(found.name).toBe('newname');
      expect(found.description).toBe('new description');
    });

    it('should throw when workspace not found', async () => {
      await expect(
        service.updateWorkspace(
          'non-existent-id',
          {
            name: 'newname',
          },
          mockOwnerId,
        ),
      ).rejects.toThrow('Workspace not found');
    });
  });

  describe('delete', () => {
    it('should delete workspace by owner', async () => {
      const created = await service.createWorkspace(mockOwnerId, mockDto);
      await service.deleteWorkspace(created.id, mockOwnerId);

      const workspaces = await service.findAllUserWorkspaces(mockOwnerId);
      expect(workspaces).toEqual([]);
    });

    it('should throw when workspace not found', async () => {
      await expect(
        service.deleteWorkspace('non-existent-id', mockOwnerId),
      ).rejects.toThrow('Workspace not found');
    });

    it('should throw when non-owner tries to delete workspace', async () => {
      const created = await service.createWorkspace(mockOwnerId, mockDto);

      await expect(
        service.deleteWorkspace(created.id, 'stranger-id'),
      ).rejects.toThrow('Only the owner can delete this workspace');
    });
  });
});
