import { PartialType } from '@nestjs/mapped-types';
import { createCommentDto } from './createComment.dto';

export class editCommentDto extends PartialType(createCommentDto) {}
