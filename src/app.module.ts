import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { ArticlesController } from './articles/articles.controller';
import { CommentsModule } from './comments/comments.module';
import { TopicsModule } from './topics/topics.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { HeaderValidationMiddleware } from './pipes/requestHeader';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Article } from './entities/article.entity';
import { User } from './entities/user.entity';
import { Topic } from './entities/topic.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 3306),
        username: configService.get('DB_USERNAME', 'root'),
        password: configService.get('DB_PASSWORD', ''),
        database: configService.get('DB_NAME', 'nc_news'),
        entities: [Article, User, Topic, Comment],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ArticlesModule,
    CommentsModule,
    TopicsModule,
    UsersModule,
  ],
  controllers: [AppController, ArticlesController, UsersController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HeaderValidationMiddleware)
      .forRoutes(
        { path: 'articles', method: RequestMethod.POST },
        { path: 'articles/:id', method: RequestMethod.PATCH },
        { path: 'articles/:id', method: RequestMethod.DELETE },
        { path: 'comments', method: RequestMethod.POST },
        { path: 'comments/:id', method: RequestMethod.PATCH },
        { path: 'comments/:id', method: RequestMethod.DELETE },
        { path: 'users', method: RequestMethod.POST },
      );
  }
}
