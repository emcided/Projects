import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Query,
  UseGuards,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAccountDto as CreateUserDto } from './dtos/create-account.dto';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserParam } from './user-decorator';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/create')
  async createAccount(@Body() dto: CreateUserDto) {
    return await this.usersService.createUser(dto);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  async identify(@UserParam() user: User) {
    return user;
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    return await this.usersService.getUser(userId);
  }
}
