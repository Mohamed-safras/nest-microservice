// import { Injectable, Scope } from '@nestjs/common';
// import * as AWS from 'aws-sdk';
// import { EmailTemplate } from '../email/reset-password-email-template';
// import { PasswordMismatchException } from '@app/common';
// import { ResetPasswordRequest } from '../dto/reset-password.request';

// AWS.config.update({ region: 'us-west-2' });

// @Injectable({ scope: Scope.DEFAULT })
// export class ResetPasswordService {
//   private ses = new AWS.SES({ apiVersion: '2010-12-01' });
//   // Inside PasswordResetService
//   public static officialName: string = 'Caring4Cal';
//   private tokenMap: Map<string, { token: string; expiration: Date }> =
//     new Map();

//   async sendResetPasswordEmail(
//     email: string,
//     source: string,
//     resetToken: string,
//     requestTimestamp: Date,
//   ): Promise<{ success: boolean; message?: string }> {
//     try {
//       const params: AWS.SES.SendEmailRequest = {
//         Source: source,
//         Destination: {
//           ToAddresses: [email],
//         },
//         Message: {
//           Subject: {
//             Data: 'Password Reset Request',
//           },
//           Body: {
//             Html: {
//               Data: EmailTemplate(email, requestTimestamp, resetToken),
//             },
//           },
//         },
//       };
//       await this.ses.sendEmail(params).promise();
//       // If successful, return success: true and an optional success message
//       return {
//         success: true,
//         message: 'Password reset email sent to your email',
//       };
//     } catch (error) {
//       console.log(error);
//       // Handle specific error cases if needed
//       if (
//         error.code === 'MessageRejected' &&
//         error.message.includes('Email address is not verified')
//       ) {
//         console.error('Email identity is not defined or not verified');
//         // Return failure: true and a failure message
//         return {
//           success: false,
//           message: 'Email identity is not defined or not verified',
//         };
//       } else {
//         // Return a generic failure message
//         return { success: false, message: 'Failed to send email' };
//       }
//     }
//   }

//   validateToken(email: string, token: string): boolean {
//     console.log(email, token);
//     const storedToken = this.tokenMap.get(email);
//     console.log(storedToken);
//     // Check if the token exists and is not expired
//     return (
//       storedToken &&
//       storedToken.token === token &&
//       new Date() < storedToken.expiration
//     );
//   }

//   generateToken(email: string): string {
//     // Generate a random token (you can use a library like 'crypto' for this)
//     const token =
//       Math.random().toString(36).substring(2, 15) +
//       Math.random().toString(36).substring(2, 15);
//     // Set the expiration time (e.g., 1 hour from now)
//     const expiration = new Date();
//     expiration.setHours(expiration.getHours() + 1);

//     // Store the token in the map
//     this.tokenMap.set(email, { token, expiration });
//     // Return the generated token
//     console.log(this.tokenMap);
//     return token;
//   }

//   deleteToken(email: string): void {
//     this.tokenMap.delete(email);
//   }

//   resetPassword(resetPasswordRequest: ResetPasswordRequest, token: string) {
//     if (
//       resetPasswordRequest.password !== resetPasswordRequest.confirmPassword
//     ) {
//       throw new PasswordMismatchException();
//     }
//     return this.validateToken(resetPasswordRequest.email, token);
//   }
// }
