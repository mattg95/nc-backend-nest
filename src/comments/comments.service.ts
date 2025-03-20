import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/entities/comment.entity';
import { createCommentDto } from './dto/createComment.dto';
import { editCommentDto } from './dto/editComment.dto';
import { editCommentVotesDto } from './dto/editCommentVotes.dto';
import { User } from 'src/entities/user.entity';
import { orderByString, sortByString } from 'src/types';
import { Article } from 'src/entities/article.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepo: Repository<Comment>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Article) private articleRepo: Repository<Article>,
  ) {}

  async findComments(
    article_id: number,
    orderBy: orderByString,
    sortBy: sortByString,
  ) {
    return this.commentsRepo
      .createQueryBuilder('comment')
      .leftJoin('comment.author', 'author')
      .select([
        'comment.id AS id',
        'comment.body AS body',
        'comment.createdAt AS createdAt',
        'comment.votes AS votes',
        'author.name AS author',
        'author.id AS authorId',
      ])
      .where('comment.articleId = :articleId', { articleId: article_id })
      .orderBy(
        sortBy === 'votes' ? 'comment.votes' : 'comment.id',
        (orderBy?.toUpperCase() as 'ASC' | 'DESC') ?? 'ASC',
      )
      .getRawMany();
  }

  async createComment(dto: createCommentDto) {
    const user = await this.userRepo.findOne({
      where: { id: dto.author },
    });

    const article = await this.articleRepo.findOne({
      where: { id: dto.article_id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const savedComment = await this.commentsRepo.save({
      ...dto,
      author: user,
      article,
    });

    return {
      id: savedComment.id,
      body: savedComment.body,
      createdAt: savedComment.createdAt,
      votes: savedComment.votes,
      author: user.name,
      authorId: user.id,
    };
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

  async editComment(id: number, dto: editCommentDto) {
    const comment = await this.commentsRepo.findOne({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    const editedComment = this.commentsRepo.create({
      ...comment,
      body: dto.body,
    });

    return await this.commentsRepo.save(editedComment);
  }

  async deleteComment(id: number): Promise<{ message: string }> {
    const comment = await this.commentsRepo.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    await this.commentsRepo.remove(comment);

    return { message: `Comment with ID ${id} has been deleted` };
  }
}
