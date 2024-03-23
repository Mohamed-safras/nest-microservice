import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AUTH_SERVICE } from '../../services';
import { validateAndAddUserOnSuccess } from '@app/common';

@Injectable()
export class JwtAdminAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return validateAndAddUserOnSuccess(
      this.authClient,
      context,
      'validate_admin_user',
    );
  }
}
