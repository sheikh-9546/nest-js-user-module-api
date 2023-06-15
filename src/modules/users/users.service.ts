import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

  
  // Find all users
  async findAll() {
    const users = this.userRepository.find();
    if (users) {
      return users;
    }
    
    // Throw an error if the user was not found
    throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
  }
  
  
  async findOne(id:number): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new NotFoundException('User not found');
  }

  async getByEmail(email:string): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      return user;
    }
    throw new NotFoundException('User not found');
  }

  
  
  

  
  // Create a new user
 async createUser(user: CreateUserDto): Promise<Users> {
   const newUser = this.userRepository.create(user);
   try {
     return await this.userRepository.save(newUser);
   } catch (error) {
     // If an error occurs while creating the user, re-throw the error with a descriptive message
     throw new Error(`Error creating user: ${error.message}`);
   }
 }
 
 

  async update(id: number, user: UpdateUserDto): Promise<Users> {
    const result = await this.userRepository.update(id, user);
    if (result.affected) {
      return await this.userRepository.findOne({ where: { id: id } });
    }
  
    // Throw an error if the user was not found
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
  

  
  // Delete a user by their id
  async delete(id: number): Promise<void> {
    const user = await this.userRepository.softDelete(id);
    if (!user.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  
}
