import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

import { MainSeeder } from './main.seeder';
import { dbConfig } from '../dbConfig';
import { ArticleFactory } from './article.factory';
import { CommentsFactory } from './comment.factory';
import { TopicFactory } from './topic.factory';
import { UserFactory } from './user.factory';

const options: DataSourceOptions & SeederOptions = {
  ...(dbConfig as DataSourceOptions),
  factories: [ArticleFactory, CommentsFactory, TopicFactory, UserFactory],
  seeds: [MainSeeder],
};

const datasource = new DataSource(options);

datasource
  .initialize()
  .then(async () => {
    await datasource.synchronize(true);
    await runSeeders(datasource);
    console.log('✅ Seeding completed!');
    process.exit();
  })
  .catch((error) => {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  });
