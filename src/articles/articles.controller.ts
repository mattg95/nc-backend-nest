import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

@Controller('articles')
export class ArticlesController {
  @Get()
  findAllArticles() {
    return 'All articles';
  }

  @Get(':id')
  findOneArticle(@Param('id') id: string) {
    return id;
  }

  @Post()
  createArticle(@Body() body) {
    return body;
  }

  @Post(':id/comment')
  createComment(@Param('id') id: string, @Body() body) {
    return `creating comment on article ${id}. Comment: ${JSON.stringify(body)}`;
  }
}
