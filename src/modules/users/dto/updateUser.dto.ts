import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength } from 'class-validator';
import { toLower } from 'lodash';
import { UserStatusEnum } from '../user.interface';

export class UpdateUserDto {

  @ApiProperty({ type: String, example: 'John', required: true, name: 'first_name' })
  @IsNotEmpty({ message: 'First name is required!' })
  @IsString({ message: 'Provide a valid first name as string' })
  @MaxLength(60)
  @Expose({ name: 'first_name' })
  public readonly firstName!: string;



  @ApiProperty({ type: String, example: 'doe', required: true, name: 'last_name' })
  @IsNotEmpty({ message: 'Last name is required!' })
  @IsString({ message: 'Provide a valid first name as string' })
  @MaxLength(60)
  @Expose({ name: 'last_name' })
  public readonly lastName!: string;


  @ApiProperty({ type: String, example: 'john@doe.com', required: true })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required!' })
  @IsString({ message: 'Provide a valid email as sting' })
  @Transform(({ value }) => value && toLower(value))
  @MaxLength(200)
  @Expose()
  public readonly email!: string;

  @ApiProperty({ type: String, example: '+19898232323', required: true , name:'phone_number'})
  @IsNumberString({}, { message: 'Phone number is required and must be a valid number' })
  @MaxLength(15)
  @Expose({ name: 'phone_number' })
  public readonly phoneNumber!: String;

  
  // Validates for an integer
  @ApiProperty({ enum: UserStatusEnum, example: UserStatusEnum.INACTIVE, required: true, name: 'status' })
  @IsIn([UserStatusEnum.ACTIVE, UserStatusEnum.INACTIVE])
  @IsNotEmpty({ message: 'Please provide a status!' })
  @IsEnum(UserStatusEnum)
  public readonly status!: UserStatusEnum;


}