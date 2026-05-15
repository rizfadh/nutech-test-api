import sequelize from '../configurations/sequelize.js';
import { QueryTypes } from 'sequelize';
import { z } from 'zod';
import type { topUpUserBalanceSchema } from '../validations/transactionValidation.js';

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

    return balanceResult[0];
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
            update user_balances
            set balance = balance + ?
            where
                user_id = ?
                and deleted_on is null
        `;

        await sequelize.query(query, {
            replacements: [top_up_amount, userId],
            type: QueryTypes.UPDATE,
            transaction,
        });

        const code = 'INV' + Date.now();

        query = `
            insert into user_transactions(code, user_id, type, description, total_amount, created_by)
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

export { getUserBalance, topUpUserBalance };
