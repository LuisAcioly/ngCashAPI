import { type } from "os"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { Accounts } from "./Accounts"

@Entity()
export class Transactions {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    value : number

    @Column()
    debitedAccountId: number

    @Column()
    creditedAccountId: number

    @ManyToOne(type => Accounts, debitedTransactions => Transactions)
    @JoinColumn({name: 'debitedAccountId'})
    debitedAccount: Accounts

    @ManyToOne(type => Accounts, creditedTransactions => Transactions)
    @JoinColumn({name: 'creditedAccountId'})
    creditedAccount : Accounts

    @CreateDateColumn({name: 'created_At'})
    createdAt: Date


}
