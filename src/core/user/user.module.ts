import { Module } from '@nestjs/common';
import { UserService } from './app/user.service';
import { USER_REPOSITORY } from './domain/types/user.repository.interface';
import { UserRepository } from './infrastructure/repository/user.repository';
import { UsersResolver } from './presentation/user.resolver';

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
