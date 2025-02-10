import { Topic } from '../entities/topic.entity';
import { Article } from '../entities/article.entity';
import { User } from '../entities/user.entity';
import { DataSource, Entity } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { ArticleFactory } from './article.factory';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const usersFactory = factoryManager.get(User);
    const articlesFactory = factoryManager.get(Article);
    const topicsFactory = factoryManager.get(Topic);
    const articlesRepo = dataSource.getRepository(Article);

    console.log('seeding users...');
    const users = await usersFactory.saveMany(10);

    console.log('seeding articles...');

    const articles: Article[] = [];

    for (const user of users) {
      const articlesForUser = await Promise.all(
        new Array(3).fill(articlesFactory.make()),
      );
      articlesForUser.forEach(async (article) => {
        article.author = user;
        articlesFactory.save(article);
      });

      articles.push(...articlesForUser);
    }

    console.log('seeding topics...');

    await topicsFactory.saveMany(10);
  }
}
