import { dataSource } from "../database/data-source";
import { Accounts } from "../models/entities/Accounts";

const repository = dataSource.getRepository(Accounts);

export default repository;