import { sortByString } from 'src/types';
import { editArticleDto } from './dto/editArticle.dto';
import { createCommentDto } from 'src/comments/dto/createComments.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { createArticleDto } from './dto/createArticle.dto';
import { editArticleVotesDto } from './dto/editArticleVotes.dto';
import { User } from 'src/entities/user.entity';
import { Topic } from 'src/entities/topic.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articlesRepo: Repository<Article>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Topic) private topicRepo: Repository<Topic>,
  ) {}

  async findAllArticles(sortBy: sortByString = 'votes') {
    return await this.articlesRepo
      .createQueryBuilder('article')
      .leftJoinAndSelect(
        (qb) =>
          qb
            .from('comments', 'comment')
            .select('comment.articleId', 'articleId')
            .addSelect('COUNT(comment.id)', 'comment_count')
            .groupBy('comment.articleId'),
        'comment_count',
        'comment_count.articleId = article.id',
      )
      .addSelect('comment_count.comment_count')
      .orderBy(
        sortBy === 'votes' ? 'article.votes' : 'comment_count.comment_count',
        'DESC',
      )
      .getMany();
  }

  async findOneArticle(id: number) {
    const article = await this.articlesRepo.findOne({
      where: {
        id,
      },
    });
    if (!article) throw new NotFoundException();
    return article;
  }
  async editArticle(id: number, dto: editArticleDto) {
    const article = await this.articlesRepo.findOne({
      where: { id: dto.author },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    const user = await this.userRepo.findOne({
      where: { id: dto.author },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const topics = await this.topicRepo.findBy({
      id: In(dto.topics),
    });

    const articleWithAuthor = this.articlesRepo.create({
      ...dto,
      author: user,
      topics,
    });

    return await this.articlesRepo.save(articleWithAuthor);
  }

  async editArticleVotes(articleId: number, increment: editArticleVotesDto) {
    const article = await this.articlesRepo.findOne({
      where: { id: articleId },
    });
    if (!article) {
      throw new NotFoundException(`Article with ID ${articleId} not found`);
    }
    article.votes += increment.inc_votes;
    await this.articlesRepo.save(article);
  }

  async createArticle(dto: createArticleDto) {
    const user = await this.userRepo.findOne({
      where: { id: dto.author },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const topics = await this.topicRepo.findBy({
      id: In(dto.topics),
    });

    const article = this.articlesRepo.create({
      ...dto,
      author: user,
      topics,
    });

    return await this.articlesRepo.save(article);
  }

  async deleteArticle(id: number) {
    return await this.articlesRepo.delete({ id });
  }

  async createComment(dto: createCommentDto) {
    return await this.articlesRepo.save(dto);
  }
}
