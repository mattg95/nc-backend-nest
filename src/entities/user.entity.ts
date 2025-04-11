import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from './article.entity';
import { Comment } from './comment.entity';
import * as bcrypt from 'bcrypt';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatar_url: string | null;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
