import { Inject, Injectable } from '@nestjs/common';
import { User } from './domain/model/user.model';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from './domain/types/user.repository.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async findById(userId: string) {
    return this.userRepository.findById(userId);
  }

  async findByUsername(username: string) {
    return this.userRepository.findByUsername(username);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async upsert(dto: CreateUserDto) {
    const userData = new User({
      id: crypto.randomUUID(),
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.userRepository.upsert(userData);
  }

  async update(userId: string, dto: UpdateUserDto) {
    return this.userRepository.update(userId, dto);
  }

  async delete(userId: string): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
