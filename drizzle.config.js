import 'dotenv/config';

/** @type import('drizzle-kit').Config */
export default {
  schema: './src/lib/server/database/schema.ts',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
};
