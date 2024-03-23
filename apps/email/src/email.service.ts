import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import EmailUtilService from './email.util.service';
import { ApprovalAction, ApprovalStatus } from '@app/common';
import { ConfigService } from '@nestjs/config';
// import { partnerDto } from './dto/partner.dto';
AWS.config.update({ region: "us-west-2" });
@Injectable()
export class EmailService {
constructor(private readonly configService:ConfigService){}
  private readonly logger = new Logger(EmailService.name);

  static async sendEmail(from: string, to: string, subject: string, body: string) {
      
      const params = {
          Destination: {
              CcAddresses: [ to ],
              ToAddresses: [ to ]
          },
          Message: {
              Body: {
                  Html: {
                      Charset: "UTF-8",
                      Data: body
                  }
              },
              Subject: {
                  Charset: 'UTF-8',
                  Data: subject
              }
          },
          Source: from,
          ReplyToAddresses: [ to ],
      };

      const sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

      sendPromise.then(
          function (data) {
              console.log(data.MessageId);
      }).catch(
          function (err) {
              console.error(err, err.stack);
      });
  }

  async handelCourseCreated(data: any) {
    console.log(data);
    EmailService.sendEmail(
        this.configService.get("FROM_EMAIL"),
        this.configService.get("TO_EMAIL"),
        EmailUtilService.getCourseEmailSubject(ApprovalStatus.APPROVED,ApprovalAction.ADD,{firstName:"Mohamed",lastName:"Safras"}),
        EmailUtilService.getCourseEmailBody(ApprovalStatus.APPROVED,ApprovalAction.ADD,{firstName:"Mohamed",lastName:"Safras"},["N/A"],data.updatedAt,data.updatedAt)
    )
    this.logger.log('Email...', data);
  }

  async handelCourseUpdated(data: any){
    this.logger.log('Email...', data.emailPayload);
    console.log(data?.emailPayload.receiver)
    EmailService.sendEmail(
        this.configService.get("FROM_EMAIL"),
        data?.emailPayload.receiver,
        EmailUtilService.getCourseEmailSubject(data?.emailPayload.type,data?.emailPayload?.action,data?.emailPayload?.partner),
        EmailUtilService.getCourseEmailBody(data?.emailPayload?.type,data?.emailPayload?.action,data?.emailPayload?.partner,["N/A"],data?.emailPayload?.updatedAt,data?.emailPayload?.updatedAt)
    )
  }
}
