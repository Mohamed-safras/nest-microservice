import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { PASSWORD_FIELD } from '../auth/services';

export const jwtOptions = (configService: ConfigService) => {
  return {
    jwtFromRequest: ExtractJwt.fromExtractors([
      (request: any) => {
        return request?.Authentication;
      },
    ]),
    secretOrKey: configService.get('JWT_SECRET'),
  };
};

export const authenticationFields = {
  usernameField: 'email',
  passwordField: PASSWORD_FIELD,
};
