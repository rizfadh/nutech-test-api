import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import response from '../utils/response.js';
import {
    getUserBalance,
    getUserTransactionHistory,
    topUpUserBalance,
    userTransaction,
} from '../services/transactionService.js';

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

const userTransactionPost: RequestHandler = async (req, res) => {
    const serviceResult = await userTransaction({
        email: req.user.email,
        ...req.body,
    });
    const userTransactionData = {
        invoice_number: serviceResult?.code,
        service_code: serviceResult?.service_code,
        service_name: serviceResult?.service_name,
        transaction_type: serviceResult?.type,
        total_amount: serviceResult?.total_amount,
        created_on: serviceResult?.created_on.toISOString(),
    };
    res.status(StatusCodes.OK).json(response.success('Transaksi berhasil', userTransactionData));
};

const userTransactionHistoryGet: RequestHandler = async (req, res) => {
    const serviceResult = await getUserTransactionHistory({
        email: req.user.email,
        ...req.query,
    });
    const userTransactionHistoryData = serviceResult.map((history) => {
        return {
            invoice_number: history.code,
            transaction_type: history.type,
            description: history.description,
            total_amount: history.total_amount,
            created_on: history.created_on.toISOString(),
        };
    });
    res.status(StatusCodes.OK).json(
        response.success('Get History Berhasil', userTransactionHistoryData)
    );
};

export { balanceGet, topUpUserBalancePost, userTransactionPost, userTransactionHistoryGet };
