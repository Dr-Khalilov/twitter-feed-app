import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

const bootstrap = async (configService: ConfigService) => {
    const user = configService.get<string>('RABBITMQ_USER');
    const password = configService.get<string>('RABBITMQ_PASSWORD');
    const host = configService.get<string>('RABBITMQ_HOST');
    const queueName = configService.get<string>('RABBITMQ_QUEUE_NAME');
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: queueName,
            noAck: false,
            queueOptions: {
                durable: true,
            },
        },
    });

    await app.listen();
};

void bootstrap(new ConfigService());
