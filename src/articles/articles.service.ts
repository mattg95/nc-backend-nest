import { sortByString } from 'src/types';
import { editArticleDto } from './dto/editArticle.dto';
import { createCommentDto } from 'src/comments/dto/createComments.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { createArticleDto } from './dto/createArticle.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articlesRepo: Repository<Article>,
  ) {}

  async findAllArticles(sortBy: sortByString) {
    return await this.articlesRepo.find();
  }
  async findOneArticle(id: number) {
    const article = await this.articlesRepo.findOne({
      where: {
        id,
      },
    });
    console.log(article);
    if (!article) throw new NotFoundException();
    return article;
  }
  async editArticle(id: number, body: editArticleDto) {
    // return await this.articlesRepo.update({ id }, body);
  }
  findOneComment(id: string) {}

  async createArticle(dto: createArticleDto) {
    return await this.articlesRepo.save(dto);
  }

  async deleteArticle(id: number) {
    return await this.articlesRepo.delete({ id });
  }

  async createComment(dto: createCommentDto) {
    return await this.articlesRepo.save(dto);
  }
}
