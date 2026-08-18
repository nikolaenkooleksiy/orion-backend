import { Inject, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { FileInfo } from 'src/common/types/file-info.type';
import { OAuthLoginDto } from 'src/core/auth/dto/oauth-login.dto';
import { StorageService } from 'src/infrastructure/storage/storage.service';
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
    private readonly storageService: StorageService,
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

  async create(body: CreateUserDto) {
    const passwordHash = await hash(body.password);

    const user = User.create({ ...body, password: passwordHash });

    return this.userRepository.create(user);
  }

  async update(userId: string, body: UpdateUserDto) {
    const user = await this.userRepository.findById(userId);

    if (body.name !== undefined) {
      user.changeName(body.name);
    }

    return this.userRepository.update(user);
  }

  async upsert(body: OAuthLoginDto) {
    const user = User.create({
      name: body.name,
      email: body.email,
      avatarUrl: body.avatarUrl,
      provider: body.provider,
      providerId: body.providerId,
    });

    return this.userRepository.upsert(user);
  }

  async delete(userId: string) {
    await this.userRepository.delete(userId);
  }

  async generateUserImageUrl(userId: string, meta: FileInfo) {
    const folder = `users/${userId}/avatar`;

    return await this.storageService.getUploadUrl(
      folder,
      meta.fileName,
      meta.contentType,
    );
  }
}
