import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'src/app.interface';

export class UserEmailAlreadyExistsException extends BadRequestException {
    constructor(message: string = ErrorCode.EMAIL_EXISTS_MESSAGE) {
        super({
            code: HttpStatus.BAD_REQUEST,
            message,
            errors: [
                {
                    field: 'email',
                    message,
                },
            ],
        });
    }
}
