import { RedisOptions } from 'ioredis';

interface ICacheConfig {
    driver: string;

    config: {
        redis: RedisOptions;
    };
}

export default {
    driver: 'redis',

    config: {
        redis: {
            host: 'localhost',
            port: 7379,
            password: undefined,
        },
    },
} as ICacheConfig;
