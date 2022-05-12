import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostController } from './post.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
    imports: [ConfigModule],
    controllers: [PostController],
    providers: [
        {
            provide: 'POST_CREATORS_SERVICE',
            useFactory: (configService: ConfigService) => {
                const user = configService.get<string>('RABBITMQ_USER');
                const password = configService.get<string>('RABBITMQ_PASSWORD');
                const host = configService.get<string>('RABBITMQ_HOST');
                const queueName = configService.get<string>(
                    'RABBITMQ_QUEUE_NAME',
                );
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [`amqp://${user}:${password}@${host}`],
                        queue: queueName,
                        queueOptions: {
                            durable: true,
                        },
                    },
                });
            },
            inject: [ConfigService],
        },
    ],
})
export class PostCreatorsModule {}
