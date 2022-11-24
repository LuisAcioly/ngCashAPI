import repository from "../repositories/UsersRepository";
import { Users } from "../models/entities/Users";
import { AccountsService } from '../services/AccountsService';
import * as bcrypt from 'bcryptjs';

export class UserService {

    async saveUser(user: Users): Promise<Users | Error>{
        const accountsService = new AccountsService();

        const userExist = await repository.findOne({ where : { username: user.username }});
        
        if(userExist){
            return new Error("Usuário com este nome já existe.");
        }

        const account = await accountsService.create();

        user.account = account;
        user.password = bcrypt.hashSync(user.password, 8);

        return await repository.save(user);         
    }


    async getUserAccount(username: string): Promise<number>{
        const user = await repository.findOne({ where: { username }});

        if(user != null){
            return user.accountId;
        }

        return null;
    }

    async getUsername(accountId: number): Promise<string>{
        const user = await repository.findOne({where: {accountId}});

        return user.username;
    }

    getUsernameList(users: Users[]){
        const usernameList = [];
        users.forEach(user => {
            usernameList.push({
                username: user.username
            })
        });

        return usernameList;
    }
}