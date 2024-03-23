import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RmqModule, DatabaseModule } from '@app/common';
import * as Joi from 'joi';
import { AuthService } from './authentication/services/auth.service';
import { JwtStrategy } from './authentication/strategies/jwt.strategy';
import { LocalStrategy } from './authentication/strategies/local.strategy';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtAdminStrategy } from './authentication/strategies/jwt.admin.strategy';
import { LocalAdminStrategy } from './authentication/strategies/local.admin.strategy';
import { AdminAuthController } from './authentication/controllers/admin.auth.controller';
import { TrainingPartnerAuthContrller } from './authentication/controllers/training.partner.auth.controller';
import { AdminAuthService } from './authentication/services/admin.auth.service';
import { EMAIL_SERVICE } from './constants/service';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    RmqModule.register({ name: EMAIL_SERVICE }),
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
      }),
      envFilePath: './apps/auth/.env',
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AdminAuthController, TrainingPartnerAuthContrller],
  providers: [
    AuthService,
    AdminAuthService,
    LocalStrategy,
    JwtStrategy,
    JwtAdminStrategy,
    LocalAdminStrategy,
  ],
})
export class AuthModule {}
