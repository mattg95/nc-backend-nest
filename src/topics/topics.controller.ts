import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { PaginationDTO } from 'src/dto/pagination.dto';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicService: TopicsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  findAllTopics(@Query() pagination: PaginationDTO) {
    return this.topicService.findAllTopics(pagination);
  }
}
