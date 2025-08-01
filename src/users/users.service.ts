import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_PAGE_SIZE } from '../config';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async createUser(user: createUserDto) {
    const newUser = await this.usersRepo.create(user);
    return await this.usersRepo.save(newUser);
  }

  async findAllUsers(pagination: PaginationDTO) {
    return await this.usersRepo.find({
      skip: pagination.skip,
      take: pagination.limit ?? DEFAULT_PAGE_SIZE,
    });
  }

  async findUser(id: number) {
    return await this.usersRepo.findOne({
      where: { id },
    });
  }
}
