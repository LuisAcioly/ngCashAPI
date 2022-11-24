import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../models/interfaces/TokenPayload";
import * as  jwt from 'jsonwebtoken';

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction){
    
    const { authorization } = req.headers;

    if(!authorization){
        res.status(401).send();
    }


    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, 'secret');

        const { id } = data as TokenPayload; 

        req.userId = id;

        return next();
    } catch (error) {
        return res.status(401).send();
    }
}