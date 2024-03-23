import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AdminRepository } from './modules/Admin/admin.repository';
import { AdminService } from './modules/Admin/admin.service';
import { TrainingPartnerRepository } from './modules/TrainingPartner/training-partner.repository';
import { Admin, AdminSchema } from './schemas/admin.schema';
import {
  TrainingPartner,
  TrainingPartnerSchema,
} from './schemas/training.partner.schema';
import { TrainingPartnerService } from './modules/TrainingPartner/training-partner.service';
import { AdminController } from './modules/Admin/admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Admin.name, schema: AdminSchema },
      { name: TrainingPartner.name, schema: TrainingPartnerSchema },
    ]),
  ],
  controllers: [UsersController, AdminController],
  providers: [
    UsersService,
    AdminService,
    TrainingPartnerService,
    UsersRepository,
    AdminRepository,
    TrainingPartnerRepository,
  ],
  exports: [UsersService, AdminService, TrainingPartnerService],
})
export class UsersModule {}
