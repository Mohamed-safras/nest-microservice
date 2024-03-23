import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
  // UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { AdminRepository } from './admin.repository';
import { Roles, UserRoles } from '@app/common';
import { Admin } from '../../schemas/admin.schema';
import { TrainingPartnerRepository } from '../TrainingPartner/training-partner.repository';
import { GetUserRequest } from '../../dto/get-user.request';
import { PasswordMismatchException } from '@app/common';
import { CreateAdminRequest } from '../../dto/create-admin.request';
// import { ApiResponse } from 'apps/auth/src/types/api.response.types';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly trainingPartnerRepository: TrainingPartnerRepository,
  ) {}

  async createUser(createAdminRequest: CreateAdminRequest) {
    try {
      if (createAdminRequest.password !== createAdminRequest.confirmPassword) {
        throw new PasswordMismatchException();
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        createAdminRequest.password,
        salt,
      );

      // Ensure the "admin" role is always present
      const rolesSet = new Set(createAdminRequest.roles || []);
      rolesSet.add(UserRoles.ADMIN);

      // Convert the set back to an array
      createAdminRequest.roles = Array.from(rolesSet);

      await this.validateCreateAdminUserDto(createAdminRequest);

      const createdUser = await this.adminRepository.create({
        ...createAdminRequest,
        password: hashedPassword,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = createdUser;

      const response = {
        user: userWithoutPassword,
      };

      return response;
    } catch (error) {
      if (error instanceof PasswordMismatchException) {
        return {
          error: {
            message: 'Password mismatch error: ' + error.message,
            code: error.getStatus(),
          },
        };
      }
      throw error;
    }
  }

  // async getTrainingPartners(createdBy: Types.ObjectId) {
  //   if (!Types.ObjectId.isValid(createdBy)) {
  //     throw new NotFoundException('Invalid ObjectId');
  //   }
  //   try {
  //     const trainingPartners = await this.trainingPartnerRepository.find({
  //       createdBy,
  //       roles: [UserRoles.TRAININGPARTNER],
  //     });

  //     if (trainingPartners.length <= 0) {
  //       throw new NotFoundException(`${Roles.TRAININGPARTNER}s not found`);
  //     }
  //     return trainingPartners;
  //   } catch (error) {
  //     throw new NotFoundException(error.response);
  //   }
  // }

  // async getTrainingPartner(getTraingPartnerDto: GetTraingPartnerDto) {
  //   return await this.trainingPartnerService.getUser(getTraingPartnerDto);
  // }

  private async validateCreateAdminUserDto(
    createAdminRequest: CreateAdminRequest,
  ) {
    try {
      await this.adminRepository.findOne({ email: createAdminRequest.email });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException(`${Roles.ADMIN} already exists`);
  }

  async getUser(getUserRequest: GetUserRequest) {
    if (!Types.ObjectId.isValid(getUserRequest._id)) {
      throw new NotFoundException('Invalid ObjectId');
    }
    try {
      return await this.adminRepository.findOne(getUserRequest, Roles.ADMIN);
    } catch (error) {
      return error.response;
    }
  }

  async getUserByEmail(email: string) {
    return await this.adminRepository.findOne({ email });
  }

  // async getUserById(id: string) {
  //   if (!Types.ObjectId.isValid(id)) {
  //     throw new NotFoundException('Invalid ObjectId');
  //   }
  //   return await this.adminRepository.findById(id);
  // }

  async deleteTrainingPartner(_id: string, currentAdminUserId: Types.ObjectId) {
    if (!Types.ObjectId.isValid(_id)) {
      throw new NotFoundException('Invalid ObjectId');
    }
    try {
      // Attempt to find and delete the training partner
      await this.trainingPartnerRepository.findOneDelete(
        {
          _id,
          createdBy: currentAdminUserId,
        },
        Roles.TRAININGPARTNER,
      );

      // Optionally, you can return information about the deleted training partner
      return { message: `${Roles.TRAININGPARTNER} deleted successfully` };
    } catch (error) {
      throw new NotFoundException(error.response);
    }
  }

  // async createLearner(createLearnerDto: CreateLearnerDto, createdBy: string) {
  //   return this.learnerService.createUser({ ...createLearnerDto, createdBy });
  // }

  async verifyAdminUserCredentials(
    email: string,
    password: string,
  ): Promise<Admin> {
    const user = await this.getUserByEmail(email);

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Incorrect username or password.');

    return user;
  }
}
