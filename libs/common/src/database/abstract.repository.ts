import { Logger, NotFoundException } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) {}

  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const createDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (
      await createDocument.save(options)
    ).toJSON() as unknown as TDocument;
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    errorMessageKey: string = 'Document',
  ): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true).exec();
    if (!document) {
      throw new NotFoundException(`${errorMessageKey} not found`);
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    errorMessageKey: string = 'Document',
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, { new: true ,runValidators:true})
      .lean<TDocument>(true);

    if (!document) {
      throw new NotFoundException(`${errorMessageKey} not found`);
    }
    return document;
  }

  async find(
    filterQuery: FilterQuery<TDocument>,
    errorMessageKey: string = 'Document',
  ): Promise<TDocument[]> {
    const document = await this.model.find(filterQuery).lean<TDocument[]>(true);
    if (!document) {
      throw new NotFoundException(`${errorMessageKey} not found`);
    }
    return document;
  }

  async findOneDelete(
    filterQuery: FilterQuery<TDocument>,
    errorMessageKey: string = 'Document',
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndDelete(filterQuery)
      .lean<TDocument>(true);
    if (!document) {
      throw new NotFoundException(`${errorMessageKey} not found`);
    }
    return document;
  }
  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }

  async findOneById(_id: string): Promise<TDocument> {
    const document = await this.model.findById(_id).lean<TDocument>(true).exec();
    if (!document) {
      throw new NotFoundException(`Document with ID ${_id} not found`);
    }
    return document;
  }
}
