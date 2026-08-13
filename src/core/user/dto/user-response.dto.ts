import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AuthProvider } from '@prisma/client';

registerEnumType(AuthProvider, { name: 'AuthProvider' });

@ObjectType('User')
export class UserResponseType {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field(() => String, { nullable: true })
  avatarUrl: string | null;

  @Field()
  email: string;

  @Field(() => AuthProvider)
  provider!: AuthProvider;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
