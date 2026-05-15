import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import response from '../utils/response.js';
import { getUserBalance, topUpUserBalance } from '../services/transactionService.js';

const balanceGet: RequestHandler = async (req, res) => {
    const serviceResult = await getUserBalance(req.user.email);
    res.status(StatusCodes.OK).json(response.success('Get Balance Berhasil', serviceResult));
};

const topUpUserBalancePost: RequestHandler = async (req, res) => {
    const serviceResult = await topUpUserBalance({
        email: req.user.email,
        ...req.body,
    });
    res.status(StatusCodes.OK).json(response.success('Top Up Balance berhasil', serviceResult));
};

export { balanceGet, topUpUserBalancePost };
