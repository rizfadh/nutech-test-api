import { DataTypes, fn } from 'sequelize';
import sequelize from '../configurations/sequelize.js';

const UserTransactions = sequelize.define(
    'UserTransactions',
    {
        id: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        service_code: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        service_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        type: {
            type: DataTypes.ENUM('TOPUP', 'PAYMENT'),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        total_amount: {
            type: DataTypes.DECIMAL(15),
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
        tableName: 'user_transactions',
        timestamps: false,
        indexes: [
            {
                name: 'idx_code',
                unique: true,
                fields: ['code'],
            },
            {
                name: 'idx_user_id',
                unique: false,
                fields: ['user_id'],
            },
            {
                name: 'idx_service_code',
                unique: false,
                fields: ['service_code'],
            },
            {
                name: 'idx_service_name',
                unique: false,
                fields: ['service_name'],
            },
            {
                name: 'idx_type',
                unique: false,
                fields: ['type'],
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

export default UserTransactions;
