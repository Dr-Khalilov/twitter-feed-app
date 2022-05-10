import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';

export const getTypeOrmConfigFactory = async (
    configService: ConfigService,
): Promise<TypeOrmModule> => ({
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
        ca: fs.readFileSync('./certs/ca.crt'),
        key: fs.readFileSync('./certs/client.root.key'),
        cert: fs.readFileSync('./certs/client.root.crt'),
    },
});
