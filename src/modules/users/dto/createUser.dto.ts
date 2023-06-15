
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsIn, IsNotEmpty, IsNumberString, IsString, MaxLength, Validate } from 'class-validator';
import { toLower } from 'lodash';
import { UserStatusEnum } from '../user.interface';
import { IsUserEmailUniqueRule } from '@app/rules/user/is.user.email.unique.rule';

export class CreateUserDto {

  @ApiProperty({ type: String, example: 'John', required: true, name: 'first_name' })
  @IsNotEmpty({ message: 'First name is required!' })
  @IsString({ message: 'Provide a valid first name as string' })
  @MaxLength(60)
  @Expose({ name: 'first_name' })
  public readonly first_name!: string;



  @ApiProperty({ type: String, example: 'doe', required: true, name: 'last_name' })
  @IsNotEmpty({ message: 'Last name is required!' })
  @IsString({ message: 'Provide a valid first name as string' })
  @MaxLength(60)
  @Expose({ name: 'last_name' })
  public readonly last_name!: string;


  @ApiProperty({ type: String, example: 'john@doe.com', required: true })
  @IsEmail({}, { message: 'Invalid email format' })
 @Validate(IsUserEmailUniqueRule)
  @IsNotEmpty({ message: 'Email is required!' })
  @IsString({ message: 'Provide a valid email as sting' })
  @Transform(({ value }) => value && toLower(value))
  @MaxLength(200)
  public readonly email!: string;

  @ApiProperty({ type: String, example: '+19898232323', required: true , name:'phone_number'})
  @IsNumberString({}, { message: 'Phone number is required and must be a valid number' })
  @MaxLength(15)
  @Expose({ name: 'phone_number' })
  public readonly phone_number!: String;

  @ApiProperty({ type: String, example: 'password123', required: true })
  @IsString()
  @IsNotEmpty()
  public password: string;

  // Validates for an integer
  @ApiProperty({ enum: UserStatusEnum, example: UserStatusEnum.INACTIVE, required: true, name: 'status' })
  @IsIn([UserStatusEnum.ACTIVE, UserStatusEnum.INACTIVE])
  @IsNotEmpty({ message: 'Please provide a status!' })
  @IsEnum(UserStatusEnum)
  public readonly status!: UserStatusEnum;

}