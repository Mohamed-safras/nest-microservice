import { Body, Controller, Post } from '@nestjs/common';
import { CreateTrainingPartnerRequest } from '../../dto/create-training.partner.request';
import { Admin } from '../../schemas/admin.schema';
import { CurrentAdmin } from 'apps/auth/src/authentication/decorators/current-admin.decorator';
import { TrainingPartnerService } from '../TrainingPartner/training-partner.service';
import { UserRoles } from '@app/common';
import { AdminService } from './admin.service';
import { CreateAdminRequest } from '../../dto/create-admin.request';

@Controller('auth')
export class AdminController {
  constructor(
    private readonly trainingPartnerService: TrainingPartnerService,
    private readonly adminService: AdminService,
  ) {}

  @Post('register/admin')
  async createUser(@Body() createAdminRequest: CreateAdminRequest) {
    return this.adminService.createUser(createAdminRequest);
  }

  @Post('create-training-partner')
  async createTrainingParner(
    @Body() createTrainingPartnerRequest: CreateTrainingPartnerRequest,
    @CurrentAdmin() admin: Admin,
  ) {
    return this.trainingPartnerService.createUser({
      ...createTrainingPartnerRequest,
      roles: [UserRoles.TRAININGPARTNER],
      createdBy: admin._id.toString(),
    });
  }
}
