import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTrainingPartnerRequest } from '../../dto/create-training.partner.request';
import { ApiResponse } from 'apps/auth/src/types/api.response.types';
import { TrainingPartner } from '../../schemas/training.partner.schema';
import { PasswordMismatchException } from '@app/common';
import * as bcrypt from 'bcrypt';
import { TrainingPartnerRepository } from './training-partner.repository';
import { Roles } from '@app/common';
@Injectable()
export class TrainingPartnerService {
  constructor(
    private readonly trainingPartnerRepository: TrainingPartnerRepository,
  ) {}

  async createUser(
    createTrainingPartnerRequest: CreateTrainingPartnerRequest,
  ): Promise<ApiResponse<TrainingPartner>> {
    try {
      if (
        createTrainingPartnerRequest.password !==
        createTrainingPartnerRequest.confirmPassword
      ) {
        throw new PasswordMismatchException();
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        createTrainingPartnerRequest.password,
        salt,
      );
      await this.validateCreateTrainingPartnerUserDto(
        createTrainingPartnerRequest,
      );

      const trainingPartner = await this.trainingPartnerRepository.create({
        ...createTrainingPartnerRequest,
        password: hashedPassword,
      });

      return {
        data: trainingPartner,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      if (error instanceof PasswordMismatchException) {
        return {
          message: error.message,
          statusCode: error.getStatus(),
        };
      }
      throw error;
    }
  }

  private async validateCreateTrainingPartnerUserDto(
    createTrainingPartnerRequest: CreateTrainingPartnerRequest,
  ) {
    try {
      await this.trainingPartnerRepository.findOne(
        {
          email: createTrainingPartnerRequest.email,
        },
        Roles.TRAININGPARTNER,
      );
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException(
      `${Roles.TRAININGPARTNER} already exists`,
    );
  }
}
