import { HttpStatus, UnauthorizedException } from '@nestjs/common';

export class UnauthorizedAccessException extends UnauthorizedException {
    constructor(message?: string) {
        super({
            code: HttpStatus.UNAUTHORIZED,
            message,
            errors: null,
        });
    }
}
