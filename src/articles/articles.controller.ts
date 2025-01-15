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
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAllArticles(@Query('sort_by') sortBy: 'comment_count') {
    return this.articlesService.findAllArticles(sortBy);
  }

  @Get(':id')
  findOneArticle(@Param('id', ParseIntPipe) id: string) {
    this.articlesService.findOneArticle(id);
  }

  @Patch(':id')
  @UsePipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }),
  )
  editArticle(@Body() body: editArticleDto) {
    this.articlesService.editArticle(body);
  }

  @Get(':id/comments')
  findOneComment(@Param('id', ParseIntPipe) id: string) {
    this.articlesService.findOneComment(id);
  }

  @Post(':id/comments')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createComment(
    @Param('id', ParseIntPipe) id: string,
    @Query('sort_by') sortBy: 'votes',
    @Body() body: createCommentDto,
  ) {
    this.articlesService.createComment(id, sortBy, body);
  }
}
