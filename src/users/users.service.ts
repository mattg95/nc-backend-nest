import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_PAGE_SIZE } from 'src/config';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

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
