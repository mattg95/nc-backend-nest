import { IsString } from 'class-validator';

export class createCommentDto {
  @IsString()
  username: string;
  @IsString()
  body: string;
}
