import { Router } from 'express';
import { balanceGet } from '../../controllers/transactionController.js';
import authenticate from '../../middlewares/authenticate.js';

const transactionRoutes = Router();

transactionRoutes.get('/balance', authenticate, balanceGet);

export default transactionRoutes;
