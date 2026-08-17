import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/model/user.model';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../domain/types/user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  async create(body: CreateUserDto): Promise<User> {
    const user = User.create(body);

    return this.userRepository.create(user);
  }

  async update(userId: string, body: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (body.name !== undefined) {
      user.changeName(body.name);
    }

    if (body.avatarUrl !== undefined) {
      user.updateAvatarUrl(body.avatarUrl);
    }

    return this.userRepository.update(user);
  }

  async delete(userId: string): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
