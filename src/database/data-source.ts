import { Console } from "console"
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Accounts } from "../models/entities/Accounts"
import { Transactions } from "../models/entities/Transactions"
import { Users } from "../models/entities/Users"

export const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [Accounts, Users, Transactions],
    migrations: ["build/database/migrations/**.js"],
    subscribers: [],
});
