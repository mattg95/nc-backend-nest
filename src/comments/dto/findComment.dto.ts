import { IsDefined, IsInt } from 'class-validator';

export class findCommentDto {
  @IsDefined()
  @IsInt()
  article_id: number;
}
