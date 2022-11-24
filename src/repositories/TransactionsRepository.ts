import { dataSource } from "../database/data-source";
import { Transactions } from "../models/entities/Transactions";

const repository = dataSource.getRepository(Transactions);

export default repository;