// src/dbConfig.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { User } from './entities/user.entity';
import { Topic } from './entities/topic.entity';
import { Comment } from './entities/comment.entity';

// Define the dbConfig object as the TypeOrmModuleOptions type
export const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nc_news',
  entities: [Article, User, Topic, Comment],
  autoLoadEntities: true,
  synchronize: true, // Be careful with this in production
};
