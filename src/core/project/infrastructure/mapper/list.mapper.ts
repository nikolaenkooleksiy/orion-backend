import { List as PrismaList } from '@prisma/client';
import { ListModel } from '../../domain/model/list.model';
import { ListResponseDto } from '../../dto/list-response.dto';

export class ListMapper {
  static toResponse(listModel: ListModel): ListResponseDto {
    return {
      id: listModel.id,
      name: listModel.name,
      createdAt: listModel.createdAt,
      updatedAt: listModel.updatedAt,
    };
  }

  static toDomain(list: PrismaList): ListModel {
    return ListModel.restore({
      id: list.id,
      name: list.name,
      boardId: list.boardId,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    });
  }

  static toPersistence(listModel: ListModel): PrismaList {
    return {
      id: listModel.id,
      name: listModel.name,
      boardId: listModel.boardId,
      createdAt: listModel.createdAt,
      updatedAt: listModel.updatedAt,
    };
  }
}
