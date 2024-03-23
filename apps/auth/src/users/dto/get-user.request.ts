import { UserRoles } from '@app/common';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetUserRequest {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsArray()
  @ArrayUnique()
  @IsEnum(UserRoles, { each: true })
  @IsOptional()
  roles?: UserRoles[];
}
