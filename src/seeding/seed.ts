import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

import { MainSeeder } from './main.seeder';
import { dbConfig } from '../dbConfig';

const options: DataSourceOptions & SeederOptions = {
  ...(dbConfig as DataSourceOptions),
  factories: [__dirname + '/../**/*.entity.{.ts,.js}'],
  seeds: [MainSeeder],
};

const datasource = new DataSource(options);

datasource.initialize().then(async () => {
  await datasource.synchronize(true);
  await runSeeders(datasource);
});
