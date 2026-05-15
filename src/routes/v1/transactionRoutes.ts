import { Router } from 'express';
import { balanceGet, topUpUserBalancePost } from '../../controllers/transactionController.js';
import authenticate from '../../middlewares/authenticate.js';
import requestValidation from '../../middlewares/requestValidation.js';
import { topUpUserBalanceSchema } from '../../validations/transactionValidation.js';

const transactionRoutes = Router();

transactionRoutes.get('/balance', authenticate, balanceGet);
transactionRoutes.post(
    '/topup',
    authenticate,
    requestValidation(topUpUserBalanceSchema),
    topUpUserBalancePost
);

export default transactionRoutes;
