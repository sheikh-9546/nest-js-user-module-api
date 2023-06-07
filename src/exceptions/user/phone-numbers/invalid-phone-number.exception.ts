import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'src/app.interface';

export class InvalidPhoneNumberException extends BadRequestException {
    constructor(message: string = ErrorCode.INVALID_PHONE_NUMBER_MESSAGE) {
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
