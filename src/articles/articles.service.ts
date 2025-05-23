import { orderByString, sortByString } from 'src/types';
import { editArticleDto } from './dto/editArticle.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { createArticleDto } from './dto/createArticle.dto';
import { editArticleVotesDto } from './dto/editArticleVotes.dto';
import { User } from 'src/entities/user.entity';
import { Topic } from 'src/entities/topic.entity';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/config';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articlesRepo: Repository<Article>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Topic) private topicRepo: Repository<Topic>,
  ) {}

  async findAllArticles(
    pagination: PaginationDTO,
    topicId?: number,
    sortBy: sortByString = 'votes',
    orderBy?: orderByString,
  ) {
    const query = this.articlesRepo
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.comments', 'comment')
      .leftJoinAndSelect('article.author', 'author')
      .leftJoinAndSelect('article.topics', 'topic') // Ensure topics are included
      .addSelect(
        '(SELECT COUNT(*) FROM comments WHERE comments.articleId = article.id)',
        'commentCount',
      );

    if (topicId) {
      query.andWhere(
        `article.id IN (
            SELECT article_topics.articlesId FROM article_topics WHERE article_topics.topicsId = :topicId
          )`,
        { topicId },
      );
    }

    const order = (orderBy ? orderBy.toUpperCase() : 'DESC') as 'ASC' | 'DESC';

    if (sortBy) {
      query.orderBy(
        sortBy === 'commentCount' ? 'commentCount' : `article.${sortBy}`,
        order,
      );
    }

    query.skip(pagination.skip).take(pagination.limit ?? DEFAULT_PAGE_SIZE);

    const articles = await query.getMany();

    return articles.map((article) => {
      return {
        ...article,
        author: article.author.username,
        commentCount: article.comments.length,
        topics: article.topics, // Expanding all topics associated with the article
      };
    });
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

    const user = await this.usersRepo.findOne({
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
    const user = await this.usersRepo.findOne({
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
}
