import { setSeederFactory } from 'typeorm-extension';
import { Comment } from '../entities/comment.entity';
import { en, Faker } from '../../node_modules/@faker-js/faker';
import { DateTime } from 'luxon';

export const CommentsFactory = setSeederFactory(Comment, () => {
  const faker = new Faker({ locale: en });
  const comment = new Comment();
  comment.body = faker.lorem.paragraph();
  comment.votes = faker.number.int({ min: 0, max: 100 });
  const randomDate = faker.date.between(
    {
      from: new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000),
      to: new Date(),
    }, // Random date between 2 years ago and today
  );
  comment.createdAt = DateTime.fromJSDate(randomDate);

  return comment;
});
