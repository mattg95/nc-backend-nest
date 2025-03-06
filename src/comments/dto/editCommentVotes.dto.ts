import { Equals, IsInt } from 'class-validator';

export class editCommentVotesDto {
  @IsInt()
  @Equals(1 || -1)
  inc_votes: number;
}
