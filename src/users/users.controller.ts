import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationDTO } from 'src/dto/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  findAllUsers(@Query() pagination: PaginationDTO) {
    return this.usersService.findAllUsers(pagination);
  }

  @Get(':id')
  findOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUser(id);
  }
}
