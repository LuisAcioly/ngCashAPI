import { type } from "os"
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm"
import { Transactions } from "./Transactions"
import { Users } from "./Users"

@Entity()
export class Accounts {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    balance: number

    @OneToOne(type => Users, account => Accounts)
    user: Users

    @OneToMany(type => Transactions, debitedTransactions => Accounts )
    debitedTransactions: Transactions[]

    @OneToMany(type => Transactions, creditedTransactions => Accounts )
    creditedTransactions: Transactions[]

}