import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationDTO } from '../dto/pagination.dto';
import { createUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createUser(@Body() createUserDto: createUserDto) {
    return this.usersService.createUser(createUserDto);
  }
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
