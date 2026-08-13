import { Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/common/decorators';
import { UserResponseType } from '../dto/user-response.dto';
import { UserService } from '../user.service';

@Resolver(() => UserResponseType)
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Public()
  @Query(() => [UserResponseType], { name: 'users' })
  async findAllUsers(): Promise<UserResponseType[]> {
    return this.userService.findAll();
  }
}
