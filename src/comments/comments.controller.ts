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
import { CommentsService } from './comments.service';
import { createCommentDto } from './dto/createComment.dto';
import { editCommentVotesDto } from './dto/editCommentVotes.dto';
import { editCommentDto } from './dto/editComment.dto';
import { orderByString, sortByString } from 'src/types';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  findComments(
    @Query('article_id') articleId: number,
    @Query('sort_by') sortBy: sortByString,
    @Query('order_by') orderBy: orderByString,
  ) {
    return this.commentsService.findComments(articleId, orderBy, sortBy);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createComment(@Body() dto: createCommentDto) {
    return this.commentsService.createComment(dto);
  }

  @Patch(':id')
  @UsePipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }),
  )
  editComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: editCommentDto,
  ) {
    return this.commentsService.editComment(id, body);
  }

  @Patch(':id/votes')
  @UsePipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }),
  )
  findOneComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() votes: editCommentVotesDto,
  ) {
    return this.commentsService.editCommentVotes(id, votes);
  }
}
