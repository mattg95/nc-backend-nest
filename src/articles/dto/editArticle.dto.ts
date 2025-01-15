import { PartialType } from '@nestjs/mapped-types';
import { createArticleDto } from './createArticle.dto';

export class editArticleDto extends PartialType(createArticleDto) {}
