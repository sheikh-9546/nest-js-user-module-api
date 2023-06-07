import { Logger } from '@nestjs/common';

export default async () => {
    try {
        return process.env;
    } catch (error) {
        new Logger().error('Error in key vault connection=>', error);

        return process.env;
    }
};
