import { Query, Resolver } from '@nestjs/graphql';
import { UserResponseType } from '../dto/user-response.dto';
import { UserService } from '../user.service';

@Resolver(() => UserResponseType)
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserResponseType], { name: 'users' })
  async findAllUsers(): Promise<UserResponseType[]> {
    return this.userService.findAll();
  }
}
