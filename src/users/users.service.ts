import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}
  async findAllUsers() {
    return await this.usersRepo.find();
  }

  async findUser(id: number) {
    return await this.usersRepo.findOne({
      where: { id },
    });
  }
}
