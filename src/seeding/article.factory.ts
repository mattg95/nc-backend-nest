import { en, Faker } from '../../node_modules/@faker-js/faker';
import { Article } from '../entities/article.entity';
import { setSeederFactory } from 'typeorm-extension';

export const ArticleFactory = setSeederFactory(Article, () => {
  const article = new Article();
  const faker = new Faker({ locale: en });
  article.title = faker.lorem.sentence();
  article.body = faker.lorem.lines();
  article.votes = faker.number.int({ min: 0, max: 1000 });

  return article;
});
