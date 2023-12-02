import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateAccountDto } from './dtos/create-account.dto';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post('/create')
  async CreateAccount(@Body() dto: CreateAccountDto) {
    return await this.registerService.createAccount(dto);
  }

  @Get(':statisticId/users')
  async getStatisticRecordSum(@Param('statisticId') statisticId: string) {
    return await this.registerService.getAccount(statisticId);
  }
}
