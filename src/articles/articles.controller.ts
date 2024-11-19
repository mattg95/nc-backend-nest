import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('articles')
export class ArticlesController {
  @Get()
  findAllArticles() {
    return 'All articles';
  }

  @Get(':id')
  findOneArticle(@Param('id', ParseIntPipe) id: string) {
    return id;
  }

  @Patch(':id')
  createArticle(@Body() body) {
    return body;
  }

  @Get(':id/comments')
  findOneComment(@Param('id', ParseIntPipe) id: string) {
    return id;
  }

  @Post(':id/comments')
  createComment(@Param('id', ParseIntPipe) id: string, @Body() body) {
    return `creating comment on article ${id}. Comment: ${JSON.stringify(body)}`;
  }
}
