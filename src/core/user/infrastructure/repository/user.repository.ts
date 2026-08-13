import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { User } from '../../domain/model/user.model';
import { type IUserRepository } from '../../domain/types/user.repository.interface';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly db: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.db.user.findMany();

    return users.map((user) => UserMapper.toModel(user));
  }

  async findById(userId: string): Promise<User> {
    const user = await this.db.user.findUniqueOrThrow({
      where: { id: userId },
    });

    return UserMapper.toModel(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.db.user.findUniqueOrThrow({
      where: { email },
    });

    return UserMapper.toModel(user);
  }

  async upsert(user: User): Promise<User> {
    const data = UserMapper.toPersistence(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, createdAt, ...updateData } = data;

    const userData = await this.db.user.upsert({
      where: {
        provider_providerId: {
          provider: user.provider,
          providerId: user.providerId!,
        },
      },
      create: data,
      update: updateData,
    });

    return UserMapper.toModel(userData);
  }

  async update(userId: string, user: Partial<User>): Promise<User> {
    const updated = await this.db.user.update({
      where: { id: userId },
      data: user,
    });
    return UserMapper.toModel(updated);
  }

  async delete(userId: string): Promise<void> {
    await this.db.user.delete({ where: { id: userId } });
  }
}
