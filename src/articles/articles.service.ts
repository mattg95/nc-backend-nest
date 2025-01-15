import { sortByString } from 'src/types';
import { editArticleDto } from './dto/editArticle.dto';
import { createCommentDto } from 'src/comments/dto/createComments.dto';

export class ArticlesService {
  findAllArticles(sortBy: sortByString) {}
  findOneArticle(id: string) {}
  editArticle(body: editArticleDto) {}
  findOneComment(id: string) {}
  createComment(id: string, sortBy: sortByString, body: createCommentDto) {}
}
