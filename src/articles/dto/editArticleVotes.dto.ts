import { IsDefined, IsIn, IsInt } from 'class-validator';

export class editArticleVotesDto {
  @IsDefined()
  @IsInt()
  @IsIn([1, -1])
  inc_votes: number;
}
