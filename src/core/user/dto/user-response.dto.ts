import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AuthProvider } from '@prisma/client';

registerEnumType(AuthProvider, { name: 'AuthProvider' });

@ObjectType('User')
export class UserResponseType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  avatarUrl: string | null;

  @Field(() => String)
  email: string;

  @Field(() => AuthProvider)
  provider!: AuthProvider;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
