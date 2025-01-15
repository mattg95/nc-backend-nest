import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTime } from 'luxon';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  topic: string;

  @Column()
  author: string;

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
}
