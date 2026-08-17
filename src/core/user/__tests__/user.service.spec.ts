import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';

import { UserService } from '../app/user.service';
import { USER_REPOSITORY } from '../domain/types/user.repository.interface';
import { InMemoryUserRepository } from '../infrastructure/repository/in-memory.user.repository';

const mockDto: CreateUserDto = {
  name: 'testuser',
  email: 'test@example.com',
  password: 'password',
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY,
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('create new user', () => {
    it('should create user and return him', async () => {
      const user = await service.create(mockDto);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toBe(mockDto.name);
      expect(user.email).toBe(mockDto.email);
    });

    it('should throw when user with same email exists', async () => {
      await service.create(mockDto);
      await expect(service.create(mockDto)).rejects.toThrow(
        'User with this email already exists',
      );
    });

    it('should throw when user with same name exists', async () => {
      await service.create(mockDto);
      await expect(
        service.create({ ...mockDto, email: 'different@example.com' }),
      ).rejects.toThrow('User with this name already exists');
    });
  });

  describe('findById', () => {
    it('should return user by id', async () => {
      const created = await service.create(mockDto);
      const found = await service.findById(created.id);

      expect(found).toBeDefined();
      expect(found.id).toBe(created.id);
      expect(found.name).toBe(mockDto.name);
    });

    it('should throw when user not found', async () => {
      await expect(service.findById('non-existent-id')).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('findByEmail', () => {
    it('should return user by email', async () => {
      await service.create(mockDto);
      const found = await service.findByEmail(mockDto.email);

      expect(found).toBeDefined();
      expect(found.email).toBe(mockDto.email);
    });

    it('should throw when user not found', async () => {
      await expect(
        service.findByEmail('nonexistent@example.com'),
      ).rejects.toThrow('User not found');
    });
  });

  describe('update', () => {
    it('should update user fields', async () => {
      const created = await service.create(mockDto);
      const updated = await service.update(created.id, {
        name: 'newname',
      });

      expect(updated.name).toBe('newname');

      const found = await service.findById(created.id);
      expect(found.name).toBe('newname');
    });

    it('should throw when user not found', async () => {
      await expect(
        service.update('non-existent-id', { name: 'newname' }),
      ).rejects.toThrow('User not found');
    });
  });

  describe('delete', () => {
    it('should delete user', async () => {
      const created = await service.create(mockDto);
      await service.delete(created.id);

      const users = await service.findAll();
      expect(users).toEqual([]);
    });

    it('should throw when user not found', async () => {
      await expect(service.delete('non-existent-id')).rejects.toThrow(
        'User not found',
      );
    });
  });
});
