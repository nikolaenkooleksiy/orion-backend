import { Prisma, User as PrismaUser } from '@prisma/client';
import { User } from '../../domain/model/user.model';

export class UserMapper {
  static toModel(user: PrismaUser): User {
    return User.restore({
      ...user,
    });
  }

  static toPersistence(user: User): Prisma.UserCreateInput {
    return {
      id: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl,
      email: user.email,
      provider: user.provider,
      providerId: user.providerId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
