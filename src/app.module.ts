import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { ArticlesController } from './articles/articles.controller';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [ArticlesModule, CommentsModule],
  controllers: [AppController, ArticlesController],
  providers: [AppService],
})
export class AppModule {}
