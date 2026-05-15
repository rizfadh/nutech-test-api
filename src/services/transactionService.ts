import sequelize from '../configurations/sequelize.js';
import { QueryTypes } from 'sequelize';

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

export { getUserBalance };
