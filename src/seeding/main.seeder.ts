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
    const articleRepo = dataSource.getRepository(Article);
    const articles = await articleRepo.save([]);

    console.log('seeding users...');
    const userFactory = factoryManager.get(User);
    const users = await userFactory.saveMany(10);
  }
}
