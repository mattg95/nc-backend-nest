import { Topic } from '../entities/topic.entity';
import { setSeederFactory } from 'typeorm-extension';

export const TopicsFactory = setSeederFactory(Topic, (faker) => {
  const topic = new Topic();
  topic.description = faker.lorem.paragraph();
  topic.slug = faker.word.noun();

  return topic;
});
