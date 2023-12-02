import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Statistic {
  @Prop()
  name: string;
}
export const StatisticSchema = SchemaFactory.createForClass(Statistic);
