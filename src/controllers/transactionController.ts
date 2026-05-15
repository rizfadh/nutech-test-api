import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import response from '../utils/response.js';
import { getUserBalance } from '../services/transactionService.js';

const balanceGet: RequestHandler = async (req, res) => {
    const serviceResult = await getUserBalance(req.user.email);
    res.status(StatusCodes.OK).json(response.success('Get Balance Berhasil', serviceResult));
};

export { balanceGet };
