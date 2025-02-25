import { IsString, Length } from 'class-validator';

export class createCommentDto {
  @IsString()
  @Length(2, 30)
  username: string;
  @Length(2, 1000)
  @IsString()
  body: string;
}
