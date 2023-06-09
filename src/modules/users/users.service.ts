import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  findAll() {
    return this.userRepository.find();
  }
  
  
  // Find a user by their id
  async findOne(id:number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (user) {
      return user;
    }
    
    // Throw an error if the user was not found
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
  

  // Create a new user
  async createUser(user: CreateUserDto): Promise<Users> {
    try {
      const newUser = this.userRepository.create(user);
      return await this.userRepository.save(newUser);
    } catch (error) {
      // If an error occurs while creating the user, throw an error with a descriptive message
      throw new Error(`Error creating user: ${error}`);
    }
  }
 

  // Update an existing user
  async update(id:number, user: UpdateUserDto): Promise<Users> {
    await this.userRepository.update(id, user);
    const updatedUser = await this.userRepository.findOne({ where: {id: id} });
    if (updatedUser) {
      return updatedUser;
    }
    
    // Throw an error if the user was not found
    throw new HttpException('user not found', HttpStatus.NOT_FOUND);
  }

  
  // Delete a user by their id
  async delete(id: number): Promise<void> {
    const deletedUser= await this.userRepository.delete(id);
    if (!deletedUser.affected) {
      
      // Throw an error if the user was not found
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
  }
}
