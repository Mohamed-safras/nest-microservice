import { AuthGuard } from '@nestjs/passport';

export default class JwtAdminAuthGuard extends AuthGuard('admin-jwt') {}
