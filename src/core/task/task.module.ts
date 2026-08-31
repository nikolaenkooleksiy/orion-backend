import { Module } from '@nestjs/common';
import { TagService } from './app/tag.service';
import { TAG_REPOSITORY } from './domain/types/tag.repository.interface';
import { TagRepository } from './infrastructure/repository/tag.repository';
import { TagResolver } from './presentation/tag.resolver';

@Module({
  providers: [
    TagService,
    TagResolver,
    {
      provide: TAG_REPOSITORY,
      useClass: TagRepository,
    },
  ],
  exports: [TagService],
})
export class TaskModule {}
