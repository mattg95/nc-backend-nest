import { Topic } from '../entities/topic.entity';
import { Article } from '../entities/article.entity';
import { User } from '../entities/user.entity';
import { Comment } from '../entities/comment.entity';

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
    const commentsFactory = factoryManager.get(Comment);
    // const articlesRepo = dataSource.getRepository(Article);

    console.log('seeding users...');
    const users = await usersFactory.saveMany(10);

    console.log('seeding articles...');
    console.log('seeding comments...');

    for (const user of users) {
      const articlesForUser = await Promise.all(
        new Array(3).fill(null).map(() => articlesFactory.make()),
      );

      for (const article of articlesForUser) {
        article.author = user;

        await articlesFactory.save(article);
        const commentsForArticle = await Promise.all(
          new Array(3).fill(null).map(() => commentsFactory.make()),
        );

        for (const comment of commentsForArticle) {
          comment.author = user;
          comment.article = article;
          await commentsFactory.save(comment);
        }
      }
    }

    console.log('seeding topics...');

    await topicsFactory.saveMany(10);
  }
}
