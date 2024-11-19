import { Equals, IsInt } from 'class-validator';

export class editArticleDto {
  @IsInt()
  @Equals(1)
  inc_votes: number;
}
