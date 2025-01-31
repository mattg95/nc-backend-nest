import { IsInt, IsString, Length } from 'class-validator';

export class createArticleDto {
  @IsInt()
  author: number;

  @Length(2, 50)
  @IsString()
  title: string;

  @Length(2, 1000)
  @IsString()
  body: string;

  @Length(2, 50)
  @IsString()
  topic: string;
}
