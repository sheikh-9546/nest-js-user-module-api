import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto,UpdateUserDto } from './dto/index.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}


  // find all
  findAll() {
    return this.userRepository.find();
  }
  // find one
  async findOne(id:number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (user) {
      return user;
    }
  
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
  

  // create user
  async createUser(user: CreateUserDto): Promise<Users> {

    console.log('users data >>>', user);
    
    const newUser = await this.userRepository.create(user);  

    console.log('new User data >>>', newUser);
      this.userRepository.save(newUser);
      
      return newUser;
  }

  // update user
  async update(id:number, user: UpdateUserDto): Promise<Users> {
    await this.userRepository.update(id, user);
    const updatedUser = await this.userRepository.findOne({ where: {id: id} });
    if (updatedUser) {
      return updatedUser;
    }
  
    throw new HttpException('user not found', HttpStatus.NOT_FOUND);
  }

  // delete user by id
  async delete(id: number): Promise<void> {
    const deletedUser= await this.userRepository.delete(id);
    if (!deletedUser.affected) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
  }
}