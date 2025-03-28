import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTime } from 'luxon';
import { Comment } from './comment.entity';
import { User } from './user.entity';
import { Topic } from './topic.entity';
import { DateTimeTransformer } from '../transformers/dateTimeTransformer';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  body: string;

  @Column({
    type: 'datetime',
    transformer: DateTimeTransformer('datetime'),
  })
  createdAt: DateTime;

  @Column({ default: 0 })
  votes: number;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.articles, { nullable: false })
  author: User;

  @ManyToMany(() => Topic, (topic) => topic.articles)
  @JoinTable({ name: 'article_topics' })
  topics: Topic[];
}
