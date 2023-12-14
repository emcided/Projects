import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { User } from './user.schema';

@Schema()
export class ApiKey {
  @Prop({ type: ObjectId, ref: User.name })
  userId: ObjectId;

  @Prop()
  apiKey: string;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
