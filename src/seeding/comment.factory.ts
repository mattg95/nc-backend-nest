import { setSeederFactory } from 'typeorm-extension';
import { Comment } from '../entities/comment.entity';

export const CommentsFactory = setSeederFactory(Comment, (faker) => {
  const comment = new Comment();
  comment.body = faker.lorem.paragraph();
  comment.votes = faker.number.int();

  return comment;
});
