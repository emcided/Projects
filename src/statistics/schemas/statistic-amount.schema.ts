import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Statistic } from './statistic.schema';

@Schema()
export class StatisticRecord {
  @Prop({ type: ObjectId, ref: Statistic.name })
  statisticId: ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop()
  amount: number;
}

export const StatisticRecordSchema =
  SchemaFactory.createForClass(StatisticRecord);
