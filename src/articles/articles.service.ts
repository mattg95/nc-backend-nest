import { sortByString } from 'src/types';
import { editArticleDto } from './dto/editArticle.dto';
import { createCommentDto } from 'src/comments/dto/createComments.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { createArticleDto } from './dto/createArticle.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articlesRepo: Repository<Article>,
  ) {}

  findAllArticles(sortBy: sortByString) {}
  findOneArticle(id: number) {
    return this.articlesRepo.findOne({
      where: {
        id,
      },
    });
  }
  editArticle(body: editArticleDto) {}
  findOneComment(id: string) {}

  async createArticle(dto: createArticleDto) {
    return await this.articlesRepo.save(dto);
  }

  async createComment(dto: createCommentDto) {
    return await this.articlesRepo.save(dto);
  }
}
