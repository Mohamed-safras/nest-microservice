import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AdminService } from '../../users/modules/Admin/admin.service';
import { authenticationFields } from '@app/common';

@Injectable()
export class LocalAdminStrategy extends PassportStrategy(
  Strategy,
  'admin-local',
) {
  constructor(private readonly adminService: AdminService) {
    super(authenticationFields);
  }

  async validate(email: string, password: string) {
    return this.adminService.verifyAdminUserCredentials(email, password);
  }
}
