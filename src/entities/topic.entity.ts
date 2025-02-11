import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from './article.entity';

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  slug: string;

  @ManyToMany(() => Article, (article) => article.topics)
  articles: Article[];
}
