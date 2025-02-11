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

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.articles, { nullable: false })
  author: User;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: {
      to: () => DateTime.now().toISO(),
      from: (value: string) => DateTime.fromISO(value),
    },
  })
  createdAt: DateTime;

  @Column({ default: 0 })
  votes: number;

  @ManyToOne(() => Article, (article) => article.id, {
    cascade: true,
  })
  article: Article;
}
