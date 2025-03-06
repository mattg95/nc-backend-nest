import { sortByString } from 'src/types';
import { editArticleDto } from './dto/editArticle.dto';
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
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Topic) private topicRepo: Repository<Topic>,
  ) {}

  async findAllArticles(sortBy: sortByString = 'votes', topic?: string) {
    const query = this.articlesRepo
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.topics', 'topic')
      .leftJoinAndSelect('article.comments', 'comment')
      .leftJoinAndSelect('article.author', 'author');

    if (topic) {
      query.where('topic.slug = :topic', { topic });
    }

    query.orderBy(
      sortBy === 'votes' ? 'article.votes' : 'comment_count.comment_count',
      'DESC',
    );

    const articles = await query.getMany();

    return articles.map((article) => ({
      ...article,
      topics: article.topics.map((topic) => topic.slug),
      author: article.author.username,
      commentCount: article.comments.length,
    }));
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
