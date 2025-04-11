import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './dbConfig';

@Module({
  imports: [
    ArticlesModule,
    CommentsModule,
    TopicsModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dbConfig),
  ],
  controllers: [AppController, ArticlesController, UsersController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeaderValidationMiddleware).forRoutes('*');
  }
}
