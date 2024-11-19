import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { editArticleDto } from './dto/editArticle.dto';
import { createCommentDto } from 'src/comments/dto/createComments.dto';

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
  @UsePipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }),
  )
  editArticle(@Body() body: editArticleDto) {
    return body;
  }

  @Get(':id/comments')
  findOneComment(@Param('id', ParseIntPipe) id: string) {
    return id;
  }

  @Post(':id/comments')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createComment(
    @Param('id', ParseIntPipe) id: string,
    @Query('sort_by') sortBy: 'votes',
    @Body() body: createCommentDto,
  ) {
    return `creating comment on article ${id}. Comment: ${JSON.stringify(body)}`;
  }
}
