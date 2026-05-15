import { DataTypes, fn } from 'sequelize';
import sequelize from '../configurations/sequelize.js';

const Services = sequelize.define(
    'Services',
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
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        icon_path: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        tariff: {
            type: DataTypes.DECIMAL(10),
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
        tableName: 'services',
        timestamps: false,
        indexes: [
            {
                name: 'idx_code',
                unique: true,
                fields: ['code'],
            },
            {
                name: 'idx_name',
                unique: false,
                fields: ['name'],
            },
            {
                name: 'idx_deleted_on',
                unique: false,
                fields: ['deleted_on'],
            },
        ],
    }
);

export default Services;
