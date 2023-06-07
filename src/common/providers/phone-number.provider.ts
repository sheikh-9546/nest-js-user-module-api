
import { Injectable, Logger } from '@nestjs/common';
import { ParseError, parsePhoneNumber, PhoneNumber } from 'libphonenumber-js';
import { CountryCode } from 'src/app.interface';
import { InvalidCountryCodeException } from 'src/exceptions/user/phone-numbers/invalid-country-code-exception';
import { InvalidPhoneNumberException } from 'src/exceptions/user/phone-numbers/invalid-phone-number.exception';

@Injectable()
export class PhoneNumberProvider {
    protected phone: string;
    protected parsedNumber: PhoneNumber;

    public setPhone(phone: string): PhoneNumberProvider {
        this.phone = phone;

        return this;
    }

    public validate(): PhoneNumberProvider {
        if (!this.parsedNumber.isValid()) {
            throw new InvalidPhoneNumberException();
        }

        return this;
    }

    public validateAllowedCountryList(): PhoneNumberProvider {
        const countryCodes: string[] = Object.values(CountryCode);
        if (!countryCodes.includes(this.parsedNumber.countryCallingCode)) {
            Logger.warn(`Invalid country code received (+${this.parsedNumber.countryCallingCode})`);
            throw new InvalidCountryCodeException();
        }

        return this;
    }

    public isValid(): boolean {
        return this.parsedNumber.isValid();
    }

    public parse(): PhoneNumberProvider {
        try {
            this.parsedNumber = parsePhoneNumber(this.phone);
        } catch (error) {
            throw error instanceof ParseError ? new InvalidPhoneNumberException() : error;
        }

        return this;
    }

    public ok(): PhoneNumber {
        return this.parsedNumber;
    }
}
