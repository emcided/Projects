import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

@Schema()
export class User {
  public _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  email: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
