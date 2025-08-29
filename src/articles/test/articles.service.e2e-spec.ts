import { getRepositoryToken } from '@nestjs/typeorm';
import { ArticlesService } from '../articles.service';
import { Article } from 'src/entities/article.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Topic } from 'src/entities/topic.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesModule } from '../articles.module';
import { UsersModule } from 'src/users/users.module';
import { CommentsModule } from 'src/comments/comments.module';
import { TopicsModule } from 'src/topics/topics.module';
import { INestApplication } from '@nestjs/common';

describe('articles.service', () => {
  let app: INestApplication;
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ArticlesModule, UsersModule, CommentsModule, TopicsModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get(ArticlesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllArticles', () => {
    it('should get all Articles', async () => {
      const result = await service.findAllArticles({ skip: 0, limit: 5 });
      expect(result).toEqual({});
    });
  });
});
