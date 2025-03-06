import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { AppService } from 'src/app.service';
import { CommentsService } from './comments.service';
import { Article } from 'src/entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { User } from 'src/entities/user.entity';
import { Topic } from 'src/entities/topic.entity';
import { ArticlesController } from 'src/articles/articles.controller';
import { ArticlesService } from 'src/articles/articles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Topic]),
  ],
  controllers: [ArticlesController, CommentsController],
  providers: [AppService, CommentsService, ArticlesService],
  exports: [CommentsService],
})
export class CommentsModule {}
