import { Controller, Get } from '@nestjs/common';

@Controller('topics')
export class TopicsController {
  @Get()
  findAllTopics() {
    return 'All topics';
  }
}
