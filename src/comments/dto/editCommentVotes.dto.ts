import { IsDefined, IsIn, IsInt } from 'class-validator';

export class editCommentVotesDto {
  @IsInt()
  @IsDefined()
  @IsIn([1, -1])
  inc_votes: number;
}
