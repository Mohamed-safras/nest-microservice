import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Admin } from '../../schemas/admin.schema';

@Injectable()
export class AdminRepository extends AbstractRepository<Admin> {
  protected readonly logger = new Logger(AdminRepository.name);

  constructor(
    @InjectModel(Admin.name) adminModel: Model<Admin>,
    @InjectConnection() connection: Connection,
  ) {
    super(adminModel, connection);
  }
}
