import { User } from '../entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';

export const UserFactory = setSeederFactory(User, (faker) => {
  const user = new User();
  user.avatar_url = faker.definitions.system.directory_path[0];
  user.name = faker.person.fullName();
  user.username = faker.person.zodiacSign();
  return user;
});
