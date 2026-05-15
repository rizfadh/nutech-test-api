import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';
import { env } from './envConfig.js';

const sequelize = new Sequelize(env.DB_DATABASE, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: 'mysql',
    dialectModule: mysql2,
    omitNull: true,
    define: {
        underscored: true,
        freezeTableName: false,
        timestamps: false,
    },
    dialectOptions: {
        connectTimeout: 20000,
        decimalNumbers: true,
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    timezone: env.DB_TIMEZONE,
});

export default sequelize;
