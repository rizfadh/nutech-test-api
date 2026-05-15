import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),

    APP_PORT: z.coerce.number().positive().default(8080),
    APP_JWT_SECRET: z.string().min(1),
    APP_JWT_EXPIRES_IN_SECONDS: z.coerce.number().positive().default(43200),

    DB_HOST: z.string().min(1),
    DB_PORT: z.coerce.number().positive(),
    DB_USER: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    DB_DATABASE: z.string().min(1),
    DB_TIMEZONE: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
