import { en, Faker } from '../../node_modules/@faker-js/faker';
import { User } from '../entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';

export const UserFactory = setSeederFactory(User, () => {
  const user = new User();
  const faker = new Faker({ locale: en });
  const firstName = faker.person.firstName();
  const name = faker.person.fullName({ firstName });

  user.avatar_url = `http://images/${firstName.toLowerCase()}.png`;
  user.name = name;
  user.username =
    firstName + faker.number.int({ max: 100 }) + faker.person.zodiacSign();
  user.email = faker.internet.email({ firstName });
  user.password = 'password123'; // This will be hashed by the @BeforeInsert hook
  return user;
});
