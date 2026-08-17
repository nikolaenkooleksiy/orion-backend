import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/model/user.model';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../domain/types/user.repository.interface';
import { UpdateUserDto } from '../dto/update-user.dto';

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

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async update(userId: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (dto.name !== undefined) {
      user.changeName(dto.name);
    }

    if (dto.avatarUrl !== undefined) {
      user.updateAvatarUrl(dto.avatarUrl);
    }

    return this.userRepository.update(user);
  }

  async delete(userId: string): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
