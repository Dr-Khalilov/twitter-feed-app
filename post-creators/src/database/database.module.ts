import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): TypeOrmModule => ({
                type: configService.get<string>('DB_TYPE'),
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USER'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                entities: [`${__dirname}/**/*.entity{.ts,.js}`],
                synchronize: configService.get<boolean>('TYPEORM_SYNC'),
                autoLoadEntities: configService.get<boolean>('LOAD_ENTITIES'),
                ssl: {
                    ca: readFileSync('./certs/ca.crt'),
                    key: readFileSync('./certs/client.root.key'),
                    cert: readFileSync('./certs/client.root.crt'),
                },
            }),
        }),
    ],
})
export class DatabaseModule {}
