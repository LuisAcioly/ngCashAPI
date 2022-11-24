import { Accounts } from "../entities/Accounts";

export interface MovementResponse{
    debitedAccount: Accounts,
    creditedAccount: Accounts
}