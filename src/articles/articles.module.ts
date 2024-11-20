import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { CommentsController } from 'src/comments/comments.controller';
import { AppService } from 'src/app.service';

@Module({
  controllers: [ArticlesController, CommentsController],
  providers: [AppService],
})
export class ArticlesModule {}
