import { Transactions } from "../models/entities/Transactions";
import { UserService } from "./UserServices";

export class TransactionsService {

    private getDate(date: Date){
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();

        const response = day + '/' + month + '/' + year;

        return response;
    }

    async organizeTransactions(transactions: Transactions[]){

        const userService = new UserService();
        
        const response = [];

        for(const transaction of transactions){
            const debitedUser = await userService.getUsername(transaction.debitedAccountId);
            const creditedUser = await userService.getUsername(transaction.creditedAccountId);
            response.push({
                id: transaction.id,
                debitedAccount: debitedUser,
                creditedAccount: creditedUser,
                date: this.getDate(transaction.createdAt),
                value: transaction.value
            })
        }

        return response;
    }
}