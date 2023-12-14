import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateStatisticRecordDto } from './dtos/create-statistic-record.dto';
import { CreateStatisticDto } from './dtos/create-statistic.dto';
import { StatisticRecordsSumInRangeDto } from './dtos/statistic-records-sum-in-range.dto';
import { StatisticRecord } from './schemas/statistic-amount.schema';
import { Statistic } from './schemas/statistic.schema';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Statistic.name) private stasticModel: Model<Statistic>,
    @InjectModel(StatisticRecord.name)
    private recordModel: Model<StatisticRecord>,
  ) {}

  async createStatistic(
    createStatisticDto: CreateStatisticDto,
    userId: ObjectId,
  ) {
    const stastic = await this.stasticModel.create({
      name: createStatisticDto.name,
      userId
    });
    return stastic;
  }

  async createRecord(
    statisticId: string,
    createStatisticRecordDto: CreateStatisticRecordDto,
  ) {
    const exists = await this.stasticModel.exists({
      _id: new ObjectId(statisticId),
    });

    if (!exists) return;

    const record = await this.recordModel.create({
      statisticId: new ObjectId(statisticId),
      amount: createStatisticRecordDto.amount,
    });

    return record;
  }
  async getStatisticRecords(statisticId: string) {
    const records = await this.recordModel.find({
      statisticId: new ObjectId(statisticId),
    });

    return records;
  }
  async getStatisticRecordsSum(statisticId: string) {
    const records = await this.recordModel.find({
      statisticId: new ObjectId(statisticId),
    });
    let sum = 0;
    for (const record of records) {
      sum += record.amount;
    }
    return sum;
  }
  async getAllStatistics() {
    const statistics = await this.stasticModel.find();
    return statistics;
  }

  async getDocumentsInDateRange(
    statisticId: string,
    dto: StatisticRecordsSumInRangeDto,
  ) {
    let filter: any = {};

    if (dto.startDate !== undefined) filter.$gte = dto.startDate;
    if (dto.endDate !== undefined) filter.$lte = dto.endDate;

    return this.recordModel
      .find({
        statisticId: new ObjectId(statisticId),
        createdAt: filter,
      })
      .select('amount -_id');
  }
}
