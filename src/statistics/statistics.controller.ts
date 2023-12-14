import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { CreateStatisticDto } from './dtos/create-statistic.dto';
import { CreateStatisticRecordDto } from './dtos/create-statistic-record.dto';
import { StatisticRecordsSumInRangeDto } from './dtos/statistic-records-sum-in-range.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserParam } from 'src/users/user-decorator';
import { User } from 'src/users/schemas/user.schema';
import { userInfo } from 'os';

@Controller('statistics')
export class StatisticsController {
  constructor(private stasticsService: StatisticsService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createStastic(
    @Body() createStatisticDto: CreateStatisticDto,
    @UserParam() user: User,
  ) {
    return await this.stasticsService.createStatistic(
      createStatisticDto,
      user._id,
    );
  }

  @Post(':statisticId/records/create')
  async createStatisticRecord(
    @Param('statisticId') statisticId: string,
    @Body() createStatisticRecordDto: CreateStatisticRecordDto,
  ) {
    return await this.stasticsService.createRecord(
      statisticId,
      createStatisticRecordDto,
    );
  }

  @Get()
  async getStatistics() {
    return this.stasticsService.getAllStatistics();
  }
  @Get(':statisticId/records')
  async getStatisticRecord(@Param('statisticId') statisticId: string) {
    return this.stasticsService.getStatisticRecords(statisticId);
  }
  @Get(':statisticId/records/sum')
  async getStatisticRecordSum(@Param('statisticId') statisticId: string) {
    return await this.stasticsService.getStatisticRecordsSum(statisticId);
  }

  @Get(':statisticId/records/sum/inRange')
  async getSumInRange(
    @Param('statisticId') statisticId: string,
    @Body() statisticRecordsSumDto: StatisticRecordsSumInRangeDto,
  ) {
    const records = await this.stasticsService.getDocumentsInDateRange(
      statisticId,
      statisticRecordsSumDto,
    );

    const sum = records.reduce((acc, record) => acc + record.amount, 0);

    return sum;
  }
}
