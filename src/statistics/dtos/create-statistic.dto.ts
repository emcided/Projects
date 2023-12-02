import { IsString } from 'class-validator';

export class CreateStatisticDto {
  @IsString()
  name: string;
}
