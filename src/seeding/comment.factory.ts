import { setSeederFactory } from 'typeorm-extension';
import { Comment } from '../entities/comment.entity';
import { en, Faker } from '../../node_modules/@faker-js/faker';

export const CommentsFactory = setSeederFactory(Comment, () => {
  const faker = new Faker({ locale: en });
  const comment = new Comment();
  comment.body = faker.lorem.paragraph();
  comment.votes = faker.number.int({ min: 0, max: 100 });

  return comment;
});
