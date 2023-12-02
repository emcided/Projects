import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { CreateStatisticDto } from './dtos/create-statistic.dto';
import { CreateStatisticRecordDto } from './dtos/create-statistic-record.dto';
import { StatisticRecordsSumInRangeDto } from './dtos/statistic-records-sum-in-range.dto';

@Controller('statistics')
export class StatisticsController {
  constructor(private stasticsService: StatisticsService) {}

  @Post('create')
  async createStastic(@Body() createStatisticDto: CreateStatisticDto) {
    return await this.stasticsService.createStatistic(createStatisticDto);
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
