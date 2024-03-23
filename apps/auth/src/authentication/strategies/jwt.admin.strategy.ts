import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Types } from 'mongoose';
import { TokenPayload } from '../services/auth.service';
import { jwtOptions } from '@app/common';
import { AdminService } from '../../users/modules/Admin/admin.service';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(
    configService: ConfigService,
    private readonly userService: AdminService,
  ) {
    super(jwtOptions(configService));
  }

  async validate({ userId }: TokenPayload) {
    try {
      return await this.userService.getUser({
        _id: new Types.ObjectId(userId).toString(),
      });
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }
  }
}
