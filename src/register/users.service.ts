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

    await this.apiKeyModel.create({
      userId: user._id,
      apiKey: apiKey,
    });

    return apiKey;
  }

  async identifyUser(apiKey: string) {
    const record = await this.apiKeyModel.findOne({
      apiKey: apiKey,
    });

    return await this.getUser(record.userId.toHexString())
  }

  async getUser(accountId: string) {
    return this.userModel.findById({
      _id: new ObjectId(accountId),
    });
  }
}
