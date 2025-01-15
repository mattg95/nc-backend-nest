import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  createdAt: number;

  @Column({ default: 0 })
  votes: number;
}
