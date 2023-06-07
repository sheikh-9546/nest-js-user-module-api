import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto,UpdateUserDto } from './dto/index.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get('list')
  async findAll(): Promise<Users[]> {
    return await this.usersService.findAll();
  }

  // get user by id
  @Get('show/:id')
  getUserById(
    @Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Post('create')
  async create(@Body() user: CreateUserDto): Promise<Users> {
    console.log('user conroller data >>>',user);

    return await this.usersService.createUser(user);
  }

  @Put('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    await this.usersService.update(id, user)
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.usersService.delete(id);
  }
}
