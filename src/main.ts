import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const runNestApplication = async (configService: ConfigService) => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
        bodyParser: true,
    });
    const user = configService.get<string>('RABBITMQ_USER');
    const password = configService.get<string>('RABBITMQ_PASSWORD');
    const host = configService.get<string>('RABBITMQ_HOST');
    const queueName = configService.get<string>('RABBITMQ_QUEUE_NAME');
    await app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: queueName,
            queueOptions: {
                durable: true,
            },
        },
    });
    app.useGlobalPipes(
        new ValidationPipe({
            disableErrorMessages: false,
            whitelist: true,
            transform: true,
        }),
    );
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('ejs');
    const port = configService.get<number>('PORT');
    await app.listen(port ?? 3001);
    Logger.log(`Application is running on: ${await app.getUrl()}`);
    await app.startAllMicroservices();
};

void runNestApplication(new ConfigService());
