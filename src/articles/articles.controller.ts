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
import { createArticleDto } from './dto/createArticle.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAllArticles(@Query('sort_by') sortBy: 'comment_count') {
    return this.articlesService.findAllArticles(sortBy);
  }

  @Get(':id')
  findOneArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findOneArticle(id);
  }

  @Post(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createArticle(@Body() dto: createArticleDto) {
    this.articlesService.createArticle(dto);
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
  createComment(@Body() dto: createCommentDto) {
    this.articlesService.createComment(dto);
  }
}
