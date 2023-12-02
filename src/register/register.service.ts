import { Injectable, Post } from '@nestjs/common';
import { RegisterAccount } from './schemas/register.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountDto } from './dtos/create-account.dto';
import { Statistic } from './../statistics/schemas/statistic.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class RegisterService {
    constructor(
        @InjectModel(RegisterAccount.name) private AccaountModel: Model<RegisterAccount>,
    ){}
    async createAccount(dto: CreateAccountDto ){
        const stastic = await this.AccaountModel.create({
            name: dto.name,
            password: dto.password,
            email: dto.email,
          });
          return stastic;
    }
    async getAccount(statisticId: string){
        const accounts = await this.AccaountModel.find({
            statisticId: new ObjectId(statisticId),
          });
    }
}
