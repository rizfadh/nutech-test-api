import sequelize from '../configurations/sequelize.js';
import { QueryTypes } from 'sequelize';
import { z } from 'zod';
import type {
    topUpUserBalanceSchema,
    userTransactionHistorySchema,
    userTransactionSchema,
} from '../validations/transactionValidation.js';
import error from '../utils/error.js';
import { StatusCodes } from 'http-status-codes';

type BalanceData = {
    balance: number;
};

const getUserBalance = async (email: string) => {
    const query = `
        select balance
        from user_balances as ub
        inner join users as u on ub.user_id = u.id
        where
            u.email = ?
            and ub.deleted_on is null
    `;

    const balanceResult = await sequelize.query<BalanceData>(query, {
        replacements: [email],
        type: QueryTypes.SELECT,
    });

    const balanceData = balanceResult[0] || { balance: 0 }

    return balanceData;
};

const topUpUserBalance = async ({
    email,
    top_up_amount,
}: z.infer<typeof topUpUserBalanceSchema>['body'] & { email: string }) => {
    let query = `
        select id
        from users
        where
            email = ?
            and deleted_on is null
    `;

    const userResult = await sequelize.query<{ id: number }>(query, {
        replacements: [email],
        type: QueryTypes.SELECT,
    });

    const userId = userResult[0]!.id;

    await sequelize.transaction(async (transaction) => {
        query = `
            insert into user_balances(
                user_id,
                balance,
                created_by
            )
            values(?, ?, ?)
            on duplicate key update
                balance = balance + values(balance),
                updated_by = values(created_by),
                updated_on = current_timestamp
        `;

        await sequelize.query(query, {
            replacements: [userId, top_up_amount, userId],
            type: QueryTypes.UPDATE,
            transaction,
        });

        const code = 'INV' + Date.now();

        query = `
            insert into user_transactions(
                code,
                user_id,
                type,
                description,
                total_amount,
                created_by
            )
            values(?, ?, ?, ?, ?, ?)
        `;

        await sequelize.query(query, {
            replacements: [code, userId, 'TOPUP', 'Top Up balance', top_up_amount, userId],
            type: QueryTypes.INSERT,
            transaction,
        });
    });

    query = `
        select balance
        from user_balances
        where
            user_id = ?
            and deleted_on is null
    `;

    const balanceResult = await sequelize.query<BalanceData>(query, {
        replacements: [userId],
        type: QueryTypes.SELECT,
    });

    return balanceResult[0];
};

type ServiceData = {
    id: number;
    name: string;
    tariff: number;
};

type UserTransactionData = {
    code: string;
    service_code: string;
    service_name: string;
    type: string;
    total_amount: number;
    created_on: Date;
};

const userTransaction = async ({
    email,
    service_code,
}: z.infer<typeof userTransactionSchema>['body'] & { email: string }) => {
    let query = `
        select id
        from users
        where
            email = ?
            and deleted_on is null
    `;

    const userResult = await sequelize.query<{ id: number }>(query, {
        replacements: [email],
        type: QueryTypes.SELECT,
    });

    const userId = userResult[0]!.id;

    query = `
        select id, name, tariff
        from services
        where
            code = ?
            and deleted_on is null
    `;

    const serviceResult = await sequelize.query<ServiceData>(query, {
        replacements: [service_code],
        type: QueryTypes.SELECT,
    });

    const serviceData = serviceResult[0];

    if (!serviceData) {
        throw error(StatusCodes.BAD_REQUEST, 102, 'Service atau Layanan tidak ditemukan');
    }

    let insertedId;

    await sequelize.transaction(async (transaction) => {
        query = `
            select balance
            from user_balances
            where
                user_id = ?
                and deleted_on is null            
        `;

        const userBalanceResult = await sequelize.query<{ balance: number }>(query, {
            replacements: [userId],
            type: QueryTypes.SELECT,
            transaction,
        });

        const userBalanceData = userBalanceResult[0]?.balance || 0;

        if (userBalanceData < serviceData.tariff) {
            throw error(
                StatusCodes.BAD_REQUEST,
                102,
                'Balance tidak mencukupi, silahkan topup dahulu'
            );
        }

        query = `
            update user_balances
            set balance = balance - ?
            where user_id = ?
        `;

        await sequelize.query(query, {
            replacements: [serviceData.tariff, userId],
            type: QueryTypes.UPDATE,
            transaction,
        });

        const code = 'INV' + Date.now();

        query = `
            insert into user_transactions(
                code,
                user_id,
                service_code,
                service_name,
                type,
                description,
                total_amount,
                created_by
            )
            values(?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const insertResult = await sequelize.query(query, {
            replacements: [
                code,
                userId,
                service_code,
                serviceData.name,
                'PAYMENT',
                serviceData.name,
                serviceData.tariff,
                userId,
            ],
            type: QueryTypes.INSERT,
            transaction,
        });

        insertedId = insertResult[0];
    });

    query = `
        select
            code,
            service_code,
            service_name,
            type,
            total_amount,
            created_on
        from user_transactions
        where
            id = ?
            and deleted_on is null
    `;

    const userTransactionResult = await sequelize.query<UserTransactionData>(query, {
        replacements: [insertedId],
        type: QueryTypes.SELECT,
    });

    return userTransactionResult[0];
};

type UserTransactionHistoryData = {
    code: string;
    type: string;
    description: string;
    total_amount: number;
    created_on: Date;
};

const getUserTransactionHistory = async ({
    email,
    limit,
    offset,
}: z.infer<typeof userTransactionHistorySchema>['query'] & { email: string }) => {
    const replacements: [string | number] = [email];

    let query = `
        select
            ut.code,
            ut.type,
            ut.description,
            ut.total_amount,
            ut.created_on
        from user_transactions as ut
        inner join users as u on ut.user_id = u.id
        where
            u.email = ?
            and ut.deleted_on is null
        order by ut.created_on desc
    `;

    query += ` limit ?`;
    replacements.push(limit ? Number(limit) : 9999999);

    if (offset != null) {
        query += ` offset ?`;
        replacements.push(Number(offset));
    }

    const userTransactionHistoryResult = await sequelize.query<UserTransactionHistoryData>(query, {
        replacements,
        type: QueryTypes.SELECT,
    });

    return userTransactionHistoryResult;
};

export { getUserBalance, topUpUserBalance, userTransaction, getUserTransactionHistory };
