import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../app/user.service';
import { UserResponseType } from '../dto/user-response.dto';

@Resolver(() => UserResponseType)
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserResponseType], { name: 'users' })
  async findAllUsers() {
    return this.userService.findAll();
  }
}
