import database, { type DB } from "./database";
import { seedProjects } from "./seeder";
import { createTables } from "./tabbel";

export const setup = async (db: DB) => {
  createTables(); 
  seedProjects(); 
};

setup(database);
