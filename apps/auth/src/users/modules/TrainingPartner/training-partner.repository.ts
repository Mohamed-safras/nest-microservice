import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { TrainingPartner } from '../../schemas/training.partner.schema';

@Injectable()
export class TrainingPartnerRepository extends AbstractRepository<TrainingPartner> {
  protected readonly logger = new Logger(TrainingPartnerRepository.name);

  constructor(
    @InjectModel(TrainingPartner.name)
    trainingPartnerModel: Model<TrainingPartner>,
    @InjectConnection() connection: Connection,
  ) {
    super(trainingPartnerModel, connection);
  }
}
