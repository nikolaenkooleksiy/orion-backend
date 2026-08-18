import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { type JwtPayload } from 'src/common/types';
import { UserService } from '../app/user.service';
import { FileInfoDto } from '../../../common/dto/file-info.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UploadFileUrlResponse } from '../../../common/dto/upload-file-url.dto';
import { UserResponseType } from '../dto/user-response.dto';

@Resolver(() => UserResponseType)
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserResponseType], { name: 'find_all_users' })
  async findAllUsers() {
    return this.userService.findAll();
  }

  @Query(() => UserResponseType, { name: 'find_user_by_id' })
  async findUserById(@Args('userId') userId: string) {
    return this.userService.findById(userId);
  }

  @Query(() => UserResponseType, { name: 'find_user_by_email' })
  async findUserByEmail(@Args('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Mutation(() => UserResponseType, { name: 'delete_user' })
  async deleteUser(@Args('userId') userId: string) {
    return this.userService.delete(userId);
  }

  @Mutation(() => UserResponseType, { name: 'update_user' })
  async updateUser(
    @Args('userId') userId: string,
    @Args('body') body: UpdateUserDto,
  ) {
    return this.userService.update(userId, { ...body });
  }

  @Mutation(() => UploadFileUrlResponse, {
    name: 'generate_user_avatar_upload_url',
  })
  async generateUserAvatarUploadUrl(
    @CurrentUser() payload: JwtPayload,
    @Args('body') body: FileInfoDto,
  ) {
    return this.userService.generateUserImageUrl(payload.sub, body);
  }
}
