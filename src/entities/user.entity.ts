import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from './article.entity';
import { Comment } from './comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatar_url: string | null;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
