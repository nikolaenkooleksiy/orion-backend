import { Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/common/decorators';
import { UserService } from '../app/user.service';
import { UserResponseType } from '../dto/user-response.dto';

@Resolver(() => UserResponseType)
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Public()
  @Query(() => [UserResponseType], { name: 'users' })
  async findAllUsers(): Promise<UserResponseType[]> {
    return this.userService.findAll();
  }
}
