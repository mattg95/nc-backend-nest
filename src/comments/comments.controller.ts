import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('comments')
export class CommentsController {
  @Get()
  findAllComments() {
    return 'All comments';
  }
  @Get(':id')
  findOneComment(@Param('id', ParseIntPipe) id: string) {
    return id;
  }
}
