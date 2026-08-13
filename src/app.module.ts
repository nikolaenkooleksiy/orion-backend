import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { AuthModule } from './core/auth/auth.module';
import { ProjectModule } from './core/project/project.module';
import { TaskModule } from './core/task/task.module';
import { UserModule } from './core/user/user.module';
import { WorkspaceModule } from './core/workspace/workspace.module';
import { PrismaModule } from './infrastructure/database/prisma.module';
import { StorageModule } from './infrastructure/storage/storage.module';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: true,
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    WorkspaceModule,
    ProjectModule,
    StorageModule,
    TaskModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
