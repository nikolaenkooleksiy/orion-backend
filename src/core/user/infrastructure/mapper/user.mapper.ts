import {
  Prisma,
  AuthProvider as PrismaAuthProvider,
  User as PrismaUser,
} from '@prisma/client';
import {
  AuthProvider as DomainAuthProvider,
  User,
} from '../../domain/model/user.model';

export class UserMapper {
  static toModel(raw: PrismaUser): User {
    return User.restore({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      avatarUrl: raw.avatarUrl,
      provider:
        DomainAuthProvider[raw.provider as keyof typeof DomainAuthProvider],
      providerId: raw.providerId,
      password: raw.password,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(user: User): Prisma.UserUncheckedCreateInput {
    const props = user.toProps();

    return {
      id: props.id,
      name: props.name,
      email: props.email,
      avatarUrl: props.avatarUrl,
      provider:
        PrismaAuthProvider[props.provider as keyof typeof PrismaAuthProvider],
      providerId: props.providerId,
      password: props.password,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }
}
