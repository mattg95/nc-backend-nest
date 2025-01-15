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

@Module({
  imports: [
    ArticlesModule,
    CommentsModule,
    TopicsModule,
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      database: process.env.DB_NAME || 'nc_news',
      autoLoadEntities: true,
      synchronize: true, // Avoid in production
    }),
  ],
  controllers: [AppController, ArticlesController, UsersController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeaderValidationMiddleware).forRoutes('*');
  }
}
