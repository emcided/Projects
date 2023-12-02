import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateAccountDto as CreateUserDto } from './dtos/create-account.dto';
import { User } from './schemas/user.schema';
import { ApiKey } from './schemas/api-key.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(ApiKey.name)
    private apiKeyModel: Model<ApiKey>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userModel.create({
      name: dto.name,
      password: dto.password,
      email: dto.email,
    });

    const apiKey = new ObjectId().toHexString();

    const opts = {
      userId: user._id,
      apiKey: apiKey,
    };

    await this.apiKeyModel.create({
      userId: new ObjectId('123456789123123456789123'),
      apiKey: 'random-key',
    });

    return apiKey;
  }

  // async identifyUser(apiKey: string) {
  //   const record = await this.apiKeyModel.findOne({
  //     apiKey: apiKey,
  //   });
  // }

  async getUser(accountId: string) {
    return this.userModel.findById({
      _id: new ObjectId(accountId),
    });
  }
}
