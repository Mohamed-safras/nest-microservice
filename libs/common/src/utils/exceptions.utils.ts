import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

export class PasswordMismatchException extends HttpException {
  constructor() {
    super('Password does not match', HttpStatus.UNAUTHORIZED);
  }
}


export class EmailNotFoundException extends NotFoundException {
  constructor(email: string) {
    super(`User with email (${email}) not found`);
  }
}

export class EmailNotVerified extends NotFoundException{
  constructor(message:string){
    super(message)
  }
}