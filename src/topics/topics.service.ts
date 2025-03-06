import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from 'src/entities/topic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TopicsService {
  constructor(@InjectRepository(Topic) private topicsRepo: Repository<Topic>) {}
  async findAllTopics() {
    return await this.topicsRepo.find();
  }
}
