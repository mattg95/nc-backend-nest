import { Module } from '@nestjs/common';
import { TopicsController } from './topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from '../entities/topic.entity';
import { TopicsService } from './topics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Topic])],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService],
})
export class TopicsModule {}
