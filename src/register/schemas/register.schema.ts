import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class RegisterAccount {
    @Prop()
    name: string;

    @Prop()
    password: string;

    @Prop()
    email: string;
}
export const RegisterAccountSchema =
  SchemaFactory.createForClass(RegisterAccount);
