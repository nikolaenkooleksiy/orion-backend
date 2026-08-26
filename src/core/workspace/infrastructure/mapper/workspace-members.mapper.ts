import { Prisma } from '@prisma/client';
import {
  WorkspaceMember,
  WorkspaceMemberRoleEnum,
} from '../../domain/model/workspace-member.model';

type WorkspaceMemberRecord = Prisma.WorkspaceMembersGetPayload<{
  select: {
    id: true;
    role: true;
    createdAt: true;
    updatedAt: true;
    user: {
      select: {
        name: true;
        email: true;
      };
    };
  };
}>;

export class WorkspaceMembersMapper {
  static toDomain(member: WorkspaceMemberRecord): WorkspaceMember {
    return WorkspaceMember.restore({
      id: member.id,
      name: member.user.name,
      email: member.user.email,
      role: WorkspaceMemberRoleEnum[member.role],
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
    });
  }
}
