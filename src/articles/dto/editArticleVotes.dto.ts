import { Equals, IsInt } from 'class-validator';

export class editArticleVotesDto {
  @IsInt()
  @Equals(1)
  inc_votes: number;
}
