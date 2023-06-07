import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from 'src/database/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import configuration from './configuration';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
            dataSourceFactory: async (options: DataSourceOptions) => new DataSource(options).initialize(),
        }),
    ],
    providers: [],
})
export class AppConfigModule {}
