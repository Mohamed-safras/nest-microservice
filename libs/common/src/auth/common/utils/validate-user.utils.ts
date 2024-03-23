import { ClientProxy } from '@nestjs/microservices';
import { Observable, catchError, tap } from 'rxjs';
import { addUser } from '@app/common';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { getAuthentication } from '@app/common';

export const validateAndAddUserOnSuccess = (
  authClient: ClientProxy,
  context: ExecutionContext,
  validateUserType: string = 'validate_user',
): boolean | Promise<boolean> | Observable<boolean> => {
  const authentication = getAuthentication(context);
  return authClient
    .send(validateUserType, {
      Authentication: authentication,
    })
    .pipe(
      tap((res) => {
        addUser(res, context);
      }),
      catchError(() => {
        throw new UnauthorizedException();
      }),
    );
};
