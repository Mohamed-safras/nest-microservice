import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '@app/common';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UserRequest {
  @IsString()
  @IsEmail({}, { message: 'Email is invalid' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 24)
  @Matches(PASSWORD_RULE, {
    message: PASSWORD_RULE_MESSAGE,
  })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'ConfirmPassword is required' })
  @Length(8, 24)
  @Matches(PASSWORD_RULE, {
    message: PASSWORD_RULE_MESSAGE,
  })
  confirmPassword: string;
}
