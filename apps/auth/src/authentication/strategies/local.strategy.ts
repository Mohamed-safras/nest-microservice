import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../../users/users.service';
import { authenticationFields } from '@app/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super(authenticationFields);
  }

  async validate(email: string, password: string) {
    return this.usersService.validateUser(email, password);
  }
}
