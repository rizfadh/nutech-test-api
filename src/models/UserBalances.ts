import { DataTypes, fn } from 'sequelize';
import sequelize from '../configurations/sequelize.js';

const UserBalances = sequelize.define(
    'UserBalances',
    {
        id: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        balance: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: fn('now'),
        },
        created_by: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        updated_on: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updated_by: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        deleted_on: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deleted_by: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
    },
    {
        tableName: 'user_balances',
        timestamps: false,
        indexes: [
            {
                name: 'idx_user_id',
                unique: true,
                fields: ['user_id'],
            },
            {
                name: 'idx_created_by',
                unique: false,
                fields: ['created_by'],
            },
            {
                name: 'idx_updated_by',
                unique: false,
                fields: ['updated_by'],
            },
            {
                name: 'idx_deleted_on',
                unique: false,
                fields: ['deleted_on'],
            },
            {
                name: 'idx_deleted_by',
                unique: false,
                fields: ['deleted_by'],
            },
        ],
    }
);

export default UserBalances;
