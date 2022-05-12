import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const runNestApplication = async (configService: ConfigService) => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
        bodyParser: true,
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
        new ValidationPipe({
            disableErrorMessages: false,
            whitelist: true,
            transform: true,
        }),
    );

    const port = configService.get<number>('PORT');

    await app.listen(port ?? 3001);
    Logger.log(`Application started on ${await app.getUrl()}`);
};

void runNestApplication(new ConfigService());
