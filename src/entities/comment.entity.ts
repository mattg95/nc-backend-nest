import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from './article.entity';
import { DateTime } from 'luxon';
import { User } from './user.entity';
import { DateTimeTransformer } from '../transformers/dateTimeTransformer';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.comments, { nullable: false })
  author: User;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: DateTimeTransformer('datetime'),
  })
  createdAt: DateTime;

  @Column({ default: 0 })
  votes: number;

  @ManyToOne(() => Article, (article) => article.id, {
    cascade: true,
  })
  article: Article;
}
