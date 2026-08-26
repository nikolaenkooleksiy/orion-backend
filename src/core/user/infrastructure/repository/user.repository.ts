import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { User } from '../../domain/model/user.model';
import { type IUserRepository } from '../../domain/types/user.repository.interface';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly db: PrismaService) {}

  async findAll() {
    const users = await this.db.user.findMany();

    return users.map((user) => UserMapper.toModel(user));
  }

  async findById(userId: string) {
    const user = await this.db.user.findUniqueOrThrow({
      where: { id: userId },
    });

    return UserMapper.toModel(user);
  }

  async findByEmail(email: string) {
    const user = await this.db.user.findUniqueOrThrow({
      where: { email },
    });

    return UserMapper.toModel(user);
  }

  async create(user: User) {
    const data = UserMapper.toPersistence(user);

    const createdUser = await this.db.user.create({ data });

    return UserMapper.toModel(createdUser);
  }

  async upsert(user: User) {
    const data = UserMapper.toPersistence(user);

    const updatedUser = await this.db.user.upsert({
      where: { email: user.email },
      update: data,
      create: data,
    });

    return UserMapper.toModel(updatedUser);
  }

  async update(user: User) {
    const data = UserMapper.toPersistence(user);

    const updatedUser = await this.db.user.update({
      where: { id: user.id },
      data,
    });

    return UserMapper.toModel(updatedUser);
  }
  async delete(userId: string): Promise<void> {
    await this.db.user.delete({ where: { id: userId } });
  }
}
