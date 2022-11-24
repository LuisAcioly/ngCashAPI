import { Router } from 'express';
import TransactionsController from '../controllers/TransactionsController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const transactionsRoutes = Router();

transactionsRoutes.post('/transactions/cash-out', AuthMiddleware, TransactionsController.cashOut);
transactionsRoutes.get('/transactions/get-all-transactions', AuthMiddleware, TransactionsController.getAllTransactions);
transactionsRoutes.get('/transactions/filter-cash-out-transactions', AuthMiddleware,TransactionsController.filterCashOutTransactions);
transactionsRoutes.get('/transactions/filter-cash-in-transactions', AuthMiddleware, TransactionsController.filterCashInTransactions);

export default transactionsRoutes;

