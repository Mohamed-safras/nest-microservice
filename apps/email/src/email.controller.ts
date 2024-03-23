import {  Controller, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { COURSE_CREATED, COURSE_UPDATED, JwtAdminAuthGuard, RmqService } from '@app/common';
import { EmailService } from './email.service';
import {Response} from "express"
@Controller()
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern(COURSE_CREATED)
  @UseGuards(JwtAdminAuthGuard)
  async handleCourseCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    await this.emailService.handelCourseCreated(data);
    this.rmqService.ack(context);
  }

  @EventPattern(COURSE_UPDATED)
  @UseGuards(JwtAdminAuthGuard)
  async handleCourseUpdated(@Payload() data: any, @Ctx() context: RmqContext,@Res() response:Response) {
    await this.emailService.handelCourseUpdated(data);
    this.rmqService.ack(context);
    response.status(HttpStatus.CREATED).json({
      message: 'Sent the email successfully',
    });
  }
}
