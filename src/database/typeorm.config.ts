import { SnakeNamingStrategy } from 'typeorm-naming-strategies'; // Updated import
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        const host = this.configService.get<string>('POSTGRES_HOST');
        const port = this.configService.get<number>('POSTGRES_PORT');
        const username = this.configService.get<string>('POSTGRES_USER');
        const password = this.configService.get<string>('POSTGRES_PASSWORD');
        const database = this.configService.get<string>('POSTGRES_DB');
        const isProduction = this.configService.get('NODE_ENV') === 'production';
        const maxConnections = this.configService.get<number>('database.maxConnections');
        const sslEnabled = this.configService.get<boolean>('database.sslEnabled');
        const ca = this.configService.get('database.ca');
        const key = this.configService.get('database.key');
        const cert = this.configService.get('database.cert');

        return <TypeOrmModuleOptions>{
            type: 'postgres',
            host: host,
            port: port,
            username: username,
            password: password,
            database: database,
            logging: !isProduction,
            migrations: [`src/database/migrations/*.{js,ts}`],
            seeds: [`../seeds/*.{js,ts}`],
            keepConnectionAlive: true,
            autoLoadEntities: true,
            synchronize: true,
            dropSchema: false,
            useUTC: true,
            cli: {
                entitiesDir: 'src/database/entities',
                migrationsDir: 'src/database/migrations',
            },
            extra: {
                max: maxConnections,
                ssl: sslEnabled ? {
                    rejectUnauthorized: false,
                    ca,
                    key,
                    cert,
                } : undefined,
            },
            namingStrategy: new SnakeNamingStrategy(),
        };
    }
}
