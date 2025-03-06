import {
  Body,
  Controller,
  Delete,
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
import { ArticlesService } from './articles.service';
import { createArticleDto } from './dto/createArticle.dto';
import { editArticleVotesDto } from './dto/editArticleVotes.dto';
import { sortByString } from 'src/types';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAllArticles(
    @Query('sort_by') sortBy: sortByString,
    @Query('topic') topic?: string,
  ) {
    return this.articlesService.findAllArticles(sortBy, topic);
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
  editArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: editArticleDto,
  ) {
    this.articlesService.editArticle(id, body);
  }

  @Patch(':id/votes')
  @UsePipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }),
  )
  editArticleVotes(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: editArticleVotesDto,
  ) {
    this.articlesService.editArticleVotes(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id) {
    return this.articlesService.deleteArticle(id);
  }
}
