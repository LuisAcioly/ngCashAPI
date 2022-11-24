import { Request, Response } from "express";
import repository from '../repositories/UsersRepository';
import * as bcrypt from 'bcryptjs';
import * as  jwt from 'jsonwebtoken';
import { AuthType } from "../models/interfaces/AuthType";

class AuthController {
    index(req: Request, res: Response){
        return res.status(200).send({ userId: req.userId });
    }

    async authenticate(req: Request, res: Response): Promise<AuthType | Response>{
        const { username, password } = req.body;
      
        const user = await repository.findOne({ where : { username }});


        if(!user){
            return res.status(401).send("Usuário ou senha invalidos.");
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword){
            return res.status(401).send("Usuário ou senha invalidos.");
        }
        
        const token = jwt.sign({id: user.id}, 'secret', {expiresIn: '1d'});

        delete user.password;

        return res.json({
            user,
            token
        });
        
    }
    
}

export default new AuthController();