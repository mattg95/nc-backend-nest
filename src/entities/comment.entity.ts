import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column()
  belongs_to: string;

  @Column()
  created_by: string;

  @Column()
  created_at: number;

  @Column({ default: 0 })
  votes: number;
}
