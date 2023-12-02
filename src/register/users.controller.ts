import { Body, Controller, Get, Param, Post, Injectable } from '@nestjs/common';
import { CreateAccountDto as CreateUserDto } from './dtos/create-account.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/create')
  async createAccount(@Body() dto: CreateUserDto) {
    return await this.usersService.createUser(dto);
  }

  @Get('/test/:apiKey')
  async identify(@Param('apiKey') apiKey: string) {
    return await this.usersService.identifyUser(apiKey);
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    return await this.usersService.getUser(userId);
  }
}
