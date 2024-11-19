import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAllUsers() {
    return 'All users';
  }

  @Get(':id')
  findOneUser(@Param('id', ParseIntPipe) id: string) {
    return id;
  }
}
