import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'src/app.interface';

export class UserPhoneAlreadyExistsException extends BadRequestException {
    constructor(message: string = ErrorCode.PHONE_EXISTS_MESSAGE) {
        super({
            code: HttpStatus.BAD_REQUEST,
            message,
            errors: [
                {
                    field: 'phone_number',
                    message,
                },
            ],
        });
    }
}
