import * as Joi from 'joi';

export default Joi.object({
    DB_TYPE: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    TYPEORM_SYNC: Joi.boolean().required(),
    LOAD_ENTITIES: Joi.boolean().required(),
    PORT: Joi.number().required(),
});
