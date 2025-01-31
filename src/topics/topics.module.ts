import { Module } from '@nestjs/common';
import { TopicsController } from './topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [TopicsController],
})
export class TopicsModule {}
