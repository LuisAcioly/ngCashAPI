import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Unique } from "typeorm"
import { Accounts } from "./Accounts";
import {
    MinLength,
    Matches
} from "class-validator"

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    @MinLength(3, {message: "Nome do usuário deve ter pelo menos 3 caracteres."})
    username : string

    @Column()
    @MinLength(8, {message: "A senha deve possuir pelo menos 8 caracteres, um número e uma letra maiúscula."})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, {message: "A senha deve possuir pelo menos 8 caracteres, um número e uma letra maiúscula."})
    password : string

    @Column()
    accountId: number;

    @OneToOne(type => Accounts, user => Users, {cascade: true})
    @JoinColumn({name: 'accountId'})
    account : Accounts

}
