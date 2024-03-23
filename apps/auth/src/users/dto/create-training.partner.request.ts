import { IsOptional } from 'class-validator';
import { CreateUserRequest } from './create-user.request';

export class CreateTrainingPartnerRequest extends CreateUserRequest {
  @IsOptional()
  createdBy: string;
}
