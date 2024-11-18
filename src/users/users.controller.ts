import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAllUsers() {
    return 'All users';
  }

  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return id;
  }
}
