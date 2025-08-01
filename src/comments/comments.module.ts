import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from '../entities/comment.entity';
import { TopicsModule } from '../topics/topics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Article } from '../entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User, Article]),
    CommentsModule,
    TopicsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
