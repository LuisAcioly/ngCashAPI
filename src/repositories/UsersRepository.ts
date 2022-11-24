import { dataSource } from "../database/data-source";
import { Users } from "../models/entities/Users";

const repository = dataSource.getRepository(Users);

export default repository;