import { Topic } from '../entities/topic.entity';
import { setSeederFactory } from 'typeorm-extension';
import { en, Faker } from '../../node_modules/@faker-js/faker';

export const TopicFactory = setSeederFactory(Topic, () => {
  const topic = new Topic();
  const faker = new Faker({ locale: en });
  topic.description = faker.lorem.paragraph();
  topic.slug = faker.word.noun();

  return topic;
});
