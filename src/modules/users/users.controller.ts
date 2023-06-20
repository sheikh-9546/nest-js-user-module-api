import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto,UpdateUserDto } from './dto/index.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { ReasonPhrases } from 'http-status-codes';
import { Auth } from '@app/common/decorator/auth.decorator';

@Controller('users')
@ApiUnauthorizedResponse({ description: ReasonPhrases.UNAUTHORIZED })
@ApiUnprocessableEntityResponse({ description: ReasonPhrases.UNPROCESSABLE_ENTITY })
@ApiInternalServerErrorResponse({ description: ReasonPhrases.INTERNAL_SERVER_ERROR })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get('list')
  @Auth()
  @ApiOkResponse({ description: ReasonPhrases.OK })
  @ApiOperation({ summary: 'allow to paginate all the users' })
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
