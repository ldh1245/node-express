import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';

dotenv.config({ path: `.env.${env}` });

const configs = {
    base: {
        ENV: env,
        APP_NAME: process.env.APP_NAME || 'App',
        HOST: process.env.HOST || '127.0.0.1',
        PORT: process.env.PORT || 4000,
    },
    production: {},
    development: {},
    local: {},
};

export default Object.assign(configs.base, configs[env]);
