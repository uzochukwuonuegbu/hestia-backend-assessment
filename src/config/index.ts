import * as dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
    // Throw generic error
    throw new Error("Couldn't find .env file");
}

export default {
    /**
     *  Application port.
     */
    port: process.env.PORT,

    /**
     * Postgres connection options.
     */
    db: {
        database: process.env.POSTGRES_DB || '',
        user: process.env.POSTGRES_USER || '',
        password: process.env.POSTGRES_PASSWORD || '',
        port: process.env.POSTGRES_PORT || 54320,
    },
};