import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { userRepositoryFactory } from './database/repositories/user';

const connection = await mysql.createConnection({
  host: env.DB_HOST,
  user: env.DB_USER,
  database: env.DB_NAME,
  password: env.DB_PASSWORD
});

const db = drizzle(connection);

export const userRepository = userRepositoryFactory(db);
export type UserRepository = ReturnType<typeof userRepositoryFactory>;
