import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { User } from 'src/users/schemas/user.schema';

@Schema()
export class Statistic {
  @Prop()
  name: string;

  @Prop({type: ObjectId, ref: User.name})
  userId: ObjectId;
}
export const StatisticSchema = SchemaFactory.createForClass(Statistic);
