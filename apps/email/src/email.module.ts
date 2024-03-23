import { Module } from '@nestjs/common';
import { RmqModule, AuthModule } from '@app/common';
import * as Joi from 'joi';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import EmailUtilService from './email.util.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_EMAIL_QUEUE: Joi.string().required(),
        FROM_EMAIL:Joi.string().required(),
      }),
      envFilePath: './apps/email/.env',
    }),
    RmqModule,
    AuthModule,
  ],
  controllers: [EmailController],
  providers: [EmailService,EmailUtilService],
})
export class EmailModule {}
