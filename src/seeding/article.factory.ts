import { en, Faker } from '../../node_modules/@faker-js/faker';
import { Article } from '../entities/article.entity';
import { setSeederFactory } from 'typeorm-extension';
import { DateTime } from 'luxon';

export const ArticleFactory = setSeederFactory(Article, () => {
  const article = new Article();
  const faker = new Faker({ locale: en });
  article.title = faker.lorem.sentence();
  article.body = faker.lorem.lines();
  article.votes = faker.number.int({ min: 0, max: 1000 });
  const randomDate = faker.date.between(
    {
      from: new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000),
      to: new Date(),
    }, // Random date between 2 years ago and today
  );

  article.createdAt = DateTime.fromJSDate(randomDate);

  return article;
});
