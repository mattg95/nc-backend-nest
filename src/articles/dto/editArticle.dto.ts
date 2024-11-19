import { IsInt } from 'class-validator';

export class editArticleDto {
  @IsInt()
  inc_votes: number;
}
