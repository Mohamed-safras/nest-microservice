import { UserRoles } from '@app/common';
import { ArrayUnique, IsArray, IsEnum, IsOptional } from 'class-validator';
import { UserRequest } from './user.request';

export class CreateUserRequest extends UserRequest {
  @IsArray()
  @ArrayUnique()
  @IsEnum(UserRoles, { each: true })
  @IsOptional()
  roles: UserRoles[];
}
