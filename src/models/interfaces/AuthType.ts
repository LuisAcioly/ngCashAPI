import { Users } from "../entities/Users";

export interface AuthType {
    user: Users,
    token: string
}