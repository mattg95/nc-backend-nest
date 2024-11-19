import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('articles')
export class ArticlesController {
  @Get()
  findAllArticles(@Query('sort_by') sortBy: 'comment_count') {
    return `All articles, sorting by ${sortBy}`;
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
  createComment(
    @Param('id', ParseIntPipe) id: string,
    @Query('sort_by') sortBy: 'votes',
    @Body() body,
  ) {
    return `creating comment on article ${id}. Comment: ${JSON.stringify(body)}`;
  }
}
