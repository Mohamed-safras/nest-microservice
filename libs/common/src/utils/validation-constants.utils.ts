import { HttpStatus, ValidationPipe } from '@nestjs/common';

export const PASSWORD_RULE =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const PASSWORD_RULE_MESSAGE =
  'The password should be minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character';

export const VALIDATION_PIPE = new ValidationPipe({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});