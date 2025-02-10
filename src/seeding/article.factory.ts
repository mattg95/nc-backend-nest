import { Article } from '../entities/article.entity';
import { setSeederFactory } from 'typeorm-extension';

export const ArticlesFactor = setSeederFactory(Article, (faker) => {
  const article = new Article();
  article.body = faker.lorem.paragraphs();
  article.title = faker.lorem.words();
  article.votes = faker.number.int();

  return article;
});
