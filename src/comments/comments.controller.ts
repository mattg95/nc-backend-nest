import { Controller, Get, Param } from '@nestjs/common';

@Controller('comments')
export class CommentsController {
  @Get()
  findAllComments() {
    return 'All comments';
  }
  @Get(':id')
  findOneComment(@Param('id') id: string) {
    return id;
  }
}
