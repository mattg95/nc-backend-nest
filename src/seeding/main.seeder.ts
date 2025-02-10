import { Topic } from '../entities/topic.entity';
import { Article } from '../entities/article.entity';
import { User } from '../entities/user.entity';
import { DataSource, Entity } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('seeding users...');
    const usersFactory = factoryManager.get(User);
    await usersFactory.saveMany(10);

    console.log('seeding articles...');

    const articlesFactory = factoryManager.get(Article);
    await articlesFactory.saveMany(10);

    console.log('seeding topics...');

    const topicsFactory = factoryManager.get(Topic);
    await topicsFactory.saveMany(10);
  }
}
