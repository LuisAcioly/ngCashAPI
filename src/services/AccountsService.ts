import { Accounts } from "../models/entities/Accounts";
import { MovementResponse } from "../models/interfaces/MovementResponse";
import repository from "../repositories/AccountsRepository";
import { UserService } from "./UserServices";

export class AccountsService {

    async create(): Promise<Accounts> {
        const account = repository.create( { balance: 100 } );
        await repository.save(account);;
        return account;
    }

    async getBalance(accountId: number): Promise<number>{
        const account = await repository.findOne({where: {id: accountId}});
        return account.balance
    }

    async balanceMovement(debitedAccountUsername: string, creditedAccountUsername: string, value: number): Promise<MovementResponse | Error>{
        const usersService = new UserService();

        try {
            const debId = await usersService.getUserAccount(debitedAccountUsername);
            const credId = await usersService.getUserAccount(creditedAccountUsername);

            if( debId == null || credId == null){
                return new Error("Usuário com este nome não existe.");
            }
            
            const response = await this.movementConsolidation( debId , credId, value);
            
            return response

        } catch (error) {
            return error;
        }
        
    }

    private async movementConsolidation(debId: number, credId: number, value): Promise<MovementResponse | Error>{
        const debitedAccount = await repository.findOne({where: {id: debId}});
        const creditedAccount = await repository.findOne({where: {id: credId}});

        if(debitedAccount.balance >= value){
            debitedAccount.balance = Number(debitedAccount.balance) - value;
            creditedAccount.balance = Number(creditedAccount.balance) + value;

            await repository.save(debitedAccount);
            await repository.save(creditedAccount);

            delete debitedAccount.balance;
            delete creditedAccount.balance;

            return {
                debitedAccount,
                creditedAccount
            } as MovementResponse;
        }

        return new Error("Saldo insuficiente.");
    }

}