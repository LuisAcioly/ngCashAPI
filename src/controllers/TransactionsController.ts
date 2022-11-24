import { Request, Response } from "express";
import { AccountsService } from "../services/AccountsService";
import repository from "../repositories/TransactionsRepository";
import { TransactionsService } from "../services/TransactionsService";

class TransactionsController {

    async cashOut(req: Request, res: Response){
        const { debitedAccountUsername, creditedAccountUsername, value } = req.body;
        const accountsService = new AccountsService();
        if(debitedAccountUsername !== creditedAccountUsername){
            try {
                const response = await accountsService.balanceMovement(debitedAccountUsername, creditedAccountUsername, value);

                if(response instanceof Error){
                    return res.status(400).json(response.message);
                }

                const transaction = await repository.save({
                    value: value,
                    debitedAccount: response.debitedAccount,
                    creditedAccount: response.creditedAccount
                })

                return res.status(200).json(transaction);

            } catch (error) {
                return res.status(400).json(error.message);
            }
        }

        return res.status(400).json("Impossivel realizar transferência para sua propria conta.");
    }

    async getAllTransactions(req: Request, res: Response) {

        const { accountId } = req.query;

        const id = Number(accountId);
    
        const transactions = await repository.find({where: [
            { debitedAccountId: id },
            { creditedAccountId: id }
        ]});

        const transactionsService = new TransactionsService();
        const response = await transactionsService.organizeTransactions(transactions);

        return res.status(200).json(response);
    }

    async filterCashOutTransactions(req: Request, res: Response){
        const { accountId } = req.query;

        const id = Number(accountId);  
    
        const transactions = await repository.find({where: { debitedAccountId: id } });

        const transactionsService = new TransactionsService();
        const response = await transactionsService.organizeTransactions(transactions);

        return res.status(200).json(response);
    }

    async filterCashInTransactions(req: Request, res: Response){
        const { accountId } = req.query;

        const id = Number(accountId);    
    
        const transactions = await repository.find({where: { creditedAccountId: id } });

        const transactionsService = new TransactionsService();
        const response = await transactionsService.organizeTransactions(transactions);

        return res.status(200).json(response);
    }
}

export default new TransactionsController();

