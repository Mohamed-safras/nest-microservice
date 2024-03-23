import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';

@Schema({ versionKey: false })
export class Admin extends User {}

export const AdminSchema = SchemaFactory.createForClass(Admin);
