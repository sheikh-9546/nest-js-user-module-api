import { BadRequestException, HttpStatus } from '@nestjs/common';
import { CountryCode, ErrorCode } from 'src/app.interface';

export class InvalidCountryCodeException extends BadRequestException {
    constructor(message: string = ErrorCode.INVALID_COUNTRY_CODE_MESSAGE) {
        super({
            code: HttpStatus.BAD_REQUEST,
            message,
            errors: [
                {
                    field: 'phone',
                    message: `Country code must be one of from [${Object.keys(CountryCode)}]`,
                },
            ],
        });
    }
}
