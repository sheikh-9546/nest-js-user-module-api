import { Encrypter } from 'src/common/helpers/encrypt.helper';
import * as crypto from 'crypto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

export const hash = () => crypto.createHash('sha256').update(randomStringGenerator()).digest('hex');

export const encrypt = (value: string): string => new Encrypter(process.env.ENCRYPTION_KEY).encrypt(value);
export const decrypt = (value: string): string => new Encrypter(process.env.ENCRYPTION_KEY).dencrypt(value);
