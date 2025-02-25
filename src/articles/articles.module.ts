import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { CommentsController } from 'src/comments/comments.controller';
import { AppService } from 'src/app.service';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { Comment } from 'src/entities/comment.entity';
import { User } from 'src/entities/user.entity';
import { Topic } from 'src/entities/topic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([Topic]),
  ],
  controllers: [ArticlesController, CommentsController],
  providers: [AppService, ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
