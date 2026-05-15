import { DataTypes, fn } from 'sequelize';
import sequelize from '../configurations/sequelize.js';

const Banners = sequelize.define(
    'Banners',
    {
        id: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image_path: {
            type: DataTypes.STRING(300),
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
        tableName: 'banners',
        timestamps: false,
        indexes: [
            {
                name: 'idx_name',
                unique: true,
                fields: ['name'],
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

export default Banners;
