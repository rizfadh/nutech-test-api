import { DataTypes, fn } from 'sequelize';
import sequelize from '../configurations/sequelize.js';

const Users = sequelize.define(
    'Users',
    {
        id: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        image_path: {
            type: DataTypes.STRING(300),
            allowNull: true,
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: fn('now'),
        },
        updated_on: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deleted_on: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'users',
        timestamps: false,
        indexes: [
            {
                name: 'idx_email',
                unique: true,
                fields: ['email'],
            },
            {
                name: 'idx_deleted_on',
                unique: false,
                fields: ['deleted_on'],
            },
        ],
    }
);

export default Users;
