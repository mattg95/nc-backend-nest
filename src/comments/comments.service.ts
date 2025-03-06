import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/entities/comment.entity';
import { createCommentDto } from './dto/createComment.dto';
import { editCommentDto } from './dto/editComment.dto';
import { editCommentVotesDto } from './dto/editCommentVotes.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepo: Repository<Comment>,
  ) {}

  async findComments(article_id: number) {
    return await this.commentsRepo.find({
      where: { article: { id: article_id } },
      relations: ['article'],
    });
  }

  async createComment(dto: createCommentDto) {
    return await this.commentsRepo.save(dto);
  }

  async editCommentVotes(id: number, increment: editCommentVotesDto) {
    const comment = await this.commentsRepo.findOne({
      where: { id },
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    comment.votes += increment.inc_votes;
    await this.commentsRepo.save(comment);
  }

  async editComment(id: number, body: editCommentDto) {
    const comment = await this.commentsRepo.findOne({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    const editedComment = this.commentsRepo.create({
      ...comment,
      ...body,
    });

    return await this.commentsRepo.save(editedComment);
  }
}
