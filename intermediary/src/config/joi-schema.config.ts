import * as Joi from 'joi';

export default Joi.object({
    PORT: Joi.number().required(),
    RABBITMQ_USER: Joi.string().required(),
    RABBITMQ_PASSWORD: Joi.string().required(),
    RABBITMQ_HOST: Joi.string().required(),
    RABBITMQ_QUEUE_NAME: Joi.string().required(),
});
