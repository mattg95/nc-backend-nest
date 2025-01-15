import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { CommentsController } from 'src/comments/comments.controller';
import { AppService } from 'src/app.service';
import { ArticlesService } from './articles.service';

@Module({
  controllers: [ArticlesController, CommentsController],
  providers: [AppService, ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
