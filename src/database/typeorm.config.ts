import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return <TypeOrmModuleOptions>{
            type: this.configService.get('DATABASE_URL')?.toString().split(':')[0] || 'postgres',
            url: this.configService.get('DATABASE_URL'),
            logging: this.configService.get('NODE_ENV') !== 'production',
            subscribers: [],
            migrations: [`../migrations/*.js`],
            seed: ['../seeds/*.js,.ts'],
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
                max: this.configService.get('database.maxConnections'),
                ssl: this.configService.get('database.sslEnabled')
                    ? {
                          rejectUnauthorized: false,
                          ca: this.configService.get('database.ca') ?? undefined,
                          key: this.configService.get('database.key') ?? undefined,
                          cert: this.configService.get('database.cert') ?? undefined,
                      }
                    : undefined,
            },
            namingStrategy: new SnakeNamingStrategy(),
        };
    }
}
