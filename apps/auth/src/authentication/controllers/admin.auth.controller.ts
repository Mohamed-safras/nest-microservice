import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAdminAuthGuard } from '../guards/local-admin-auth.guard';
import { CurrentAdmin } from '../decorators/current-admin.decorator';
import { Admin } from '../../users/schemas/admin.schema';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import JwtAdminAuthGuard from '../guards/jwt-admin-auth.guard';
import { MessagePattern } from '@nestjs/microservices';
import { AdminAuthService } from '../services/admin.auth.service';

@Controller('auth')
export class AdminAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminAuthService: AdminAuthService,
  ) {}

  @UseGuards(LocalAdminAuthGuard)
  @Post('admin/login')
  async login(
    @CurrentAdmin() adminUser: Admin,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(adminUser, response);
    response.send(adminUser);
  }

  @UseGuards(JwtAdminAuthGuard)
  @MessagePattern('validate_admin_user')
  async validateAdminUser(@CurrentAdmin() adminUser: Admin) {
    return adminUser;
  }
}
