import {
  Column,
  CreateDateColumn,
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

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: {
      to: () => DateTime.now().toISO(), // Convert to ISO string on save
      from: (value: string) => DateTime.fromISO(value), // Convert to DateTime on retrieval
    },
  })
  createdAt: DateTime;

  @Column({ default: 0 })
  votes: number;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.articles)
  author: User;

  @ManyToMany(() => Topic, (topic) => topic.articles)
  @JoinTable()
  topics: Topic[];
}
