import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from './domain/types/user.repository.interface';
import { UserRepository } from './infrastructure/repository/user.repository';
import { UsersResolver } from './presentation/user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [
    UserService,
    UsersResolver,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [USER_REPOSITORY, UserService],
})
export class UserModule {}
