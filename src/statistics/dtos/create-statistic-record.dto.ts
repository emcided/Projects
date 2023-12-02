import { IsNumber, isNumber } from 'class-validator';

export class CreateStatisticRecordDto {
  @IsNumber()
  amount: number;
}
