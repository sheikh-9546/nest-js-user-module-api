import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { UsersService } from '@app/modules/users/users.service';

@ValidatorConstraint({ name: 'IsUserEmailUnique', async: true })
@Injectable()
export class IsUserEmailUniqueRule implements ValidatorConstraintInterface {

  constructor(private readonly userService: UsersService) {}

  async validate(email: string, validationArguments?: ValidationArguments): Promise<boolean> {
    const user = await this.userService.getByEmail(email);
    return !user;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Email already exists';
  }

}

