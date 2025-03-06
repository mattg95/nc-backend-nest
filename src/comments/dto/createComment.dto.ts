import { IsDefined, IsInt, IsString, Length } from 'class-validator';

export class createCommentDto {
  @IsDefined()
  @IsInt()
  author: number;

  @Length(2, 1000)
  @IsString()
  body: string;

  @IsDefined()
  @IsInt()
  article_id: number;
}
