import { Article } from '../entities/article.entity';
import { User } from '../entities/user.entity';
import { DataSource, Entity } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('seeding articles...');

    const articlesFactory = factoryManager.get(Article);
    await articlesFactory.saveMany(10);
  }
}
