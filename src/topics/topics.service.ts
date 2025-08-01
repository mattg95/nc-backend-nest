import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_PAGE_SIZE } from '../config';
import { PaginationDTO } from '../dto/pagination.dto';
import { Topic } from '../entities/topic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TopicsService {
  constructor(@InjectRepository(Topic) private topicsRepo: Repository<Topic>) {}
  async findAllTopics(pagination: PaginationDTO) {
    return await this.topicsRepo.find({
      skip: pagination.skip,
      take: pagination.limit ?? DEFAULT_PAGE_SIZE,
    });
  }
}
